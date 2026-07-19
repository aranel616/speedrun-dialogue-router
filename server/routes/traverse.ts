import {Router, Request, Response} from "express";
import {loadScript} from "../lib/scriptLoader";
import {traverse, getNextNode, evaluateCondition, calculateDialogueLength} from "@sdr/engine";
import {isSingleVariableFork} from "../lib/graphBuilder";
import {Script, Context} from "@sdr/engine";
import {TraverseRequest, TraverseResponse} from "../types";

const router = Router();

function computeVisitedNodeIds(
    script: Script,
    path: string[],
    startNode: string,
    initialContext: Context
): { visitedNodeIds: string[]; cumulativeCounts: Record<string, number> } {
    const visited: string[] = [];
    const cumulativeCounts: Record<string, number> = {};
    let nodeId: string = startNode;
    const context: Context = {...initialContext};
    let pathIdx = 0;
    let runningTotal = 0;

    while (nodeId && pathIdx < path.length) {
        const node = script[nodeId];
        if (!node) {break;}

        visited.push(nodeId);

        if ("choices" in node) {
            cumulativeCounts[nodeId] = runningTotal;

            const choiceName = path[pathIdx++];
            const choiceIdx = node.choices.findIndex((c) => c.name === choiceName);
            if (choiceIdx === -1) {break;}
            const choice = node.choices[choiceIdx]!;
            const ciId = `${nodeId}__ci${choiceIdx}`;
            visited.push(ciId);

            runningTotal += calculateDialogueLength(choice.text);
            cumulativeCounts[ciId] = runningTotal;

            if (choice.set) {
                const sets = Array.isArray(choice.set) ? choice.set : [choice.set];
                for (const s of sets) {
                    if (s.type === "set") {context[s.name] = s.value;}
                }
            }

            if (choice.next === undefined) {break;}
            const next = getNextNode(script, choice.next, context);
            if (!next) {break;}
            if (Array.isArray(choice.next)) {
                const j = choice.next.findIndex((c) => evaluateCondition(c, context));
                if (j >= 0) {visited.push(isSingleVariableFork(choice.next) ? `${ciId}__cond` : `${ciId}__cond${j}`);}
            }
            nodeId = next;
        } else {
            runningTotal += calculateDialogueLength(node.text);
            cumulativeCounts[nodeId] = runningTotal;

            pathIdx++;
            if (node.next === undefined) {break;}
            const next = getNextNode(script, node.next, context);
            if (!next) {break;}
            if (Array.isArray(node.next)) {
                const j = node.next.findIndex((c) => evaluateCondition(c, context));
                if (j >= 0) {visited.push(isSingleVariableFork(node.next) ? `${nodeId}__cond` : `${nodeId}__cond${j}`);}
            }
            nodeId = next;
        }
    }

    return {visitedNodeIds: visited, cumulativeCounts};
}

router.post("/", (req: Request, res: Response) => {
    const {scriptId, startNode = "start", initialContext = {}} = req.body as TraverseRequest;

    try {
        const {script} = loadScript(scriptId);
        const [length, path, context] = traverse(script, startNode, 0, initialContext as Context, 0);
        const {visitedNodeIds, cumulativeCounts} = computeVisitedNodeIds(script, path, startNode, initialContext as Context);
        const response: TraverseResponse = {length, path, context, visitedNodeIds, cumulativeCounts};
        res.json(response);
    } catch (err: unknown) {
        res.status(500).json({error: (err as Error).message});
    }
});

export default router;
