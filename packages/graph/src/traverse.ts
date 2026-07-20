import {traverse, getNextNode, evaluateCondition, calculateDialogueLength, Script, Context} from "@sdr/engine";
import {TraverseResponse} from "@sdr/shared";
import {isSingleVariableFork} from "./graphBuilder";

// Replay the chosen path to record which node ids (and synthetic choice/
// condition ids) the shortest route visits, plus the running character total
// at each — the data the UI highlights.
function computeVisited(
    script: Script,
    path: string[],
    startNode: string,
    initialContext: Context,
): { visitedNodeIds: string[]; cumulativeCounts: Record<string, number> } {
    const visited: string[] = [];
    const cumulativeCounts: Record<string, number> = {};
    let nodeId: string = startNode;
    const context: Context = {...initialContext};
    let pathIdx = 0;
    let runningTotal = 0;

    while (pathIdx < path.length) {
        const node = script[nodeId];
        /* istanbul ignore next -- defensive: the path always references real nodes */
        if (!node) {break;}

        visited.push(nodeId);

        if ("choices" in node) {
            cumulativeCounts[nodeId] = runningTotal;

            const choiceName = path[pathIdx++];
            const choiceIdx = node.choices.findIndex((c) => c.name === choiceName);
            /* istanbul ignore next -- defensive: the path's choice name always matches */
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
            const next = getNextNode(choice.next, context);
            if (!next) {break;}
            if (Array.isArray(choice.next)) {
                const j = choice.next.findIndex((c) => evaluateCondition(c, context));
                visited.push(isSingleVariableFork(choice.next) ? `${ciId}__cond` : `${ciId}__cond${j}`);
            }
            nodeId = next;
        } else {
            runningTotal += calculateDialogueLength(node.text);
            cumulativeCounts[nodeId] = runningTotal;

            pathIdx++;
            if (node.next === undefined) {break;}
            const next = getNextNode(node.next, context);
            if (!next) {break;}
            if (Array.isArray(node.next)) {
                const j = node.next.findIndex((c) => evaluateCondition(c, context));
                visited.push(isSingleVariableFork(node.next) ? `${nodeId}__cond` : `${nodeId}__cond${j}`);
            }
            nodeId = next;
        }
    }

    return {
        visitedNodeIds: visited,
        cumulativeCounts
    };
}

// Run the shortest-path search and package the full response the UI needs.
export function runTraverse(
    script: Script,
    startNode = "start",
    initialContext: Context = {},
): TraverseResponse {
    const [length, path, context] = traverse(script, startNode, 0, initialContext);
    const {visitedNodeIds, cumulativeCounts} = computeVisited(script, path, startNode, initialContext);
    return {
        length,
        path,
        context,
        visitedNodeIds,
        cumulativeCounts
    };
}
