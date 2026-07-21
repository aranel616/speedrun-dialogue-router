import {traverse, getNextNode, evaluateCondition, calculateDialogueLength, calculateDialogueSyllables, Script, Context, Metric, applySets} from "@sdr/engine";
import {TraverseResponse} from "@sdr/shared";
import {isSingleVariableFork} from "./graphBuilder";

// Replay the chosen path to record which node ids (and synthetic choice/
// condition ids) the shortest route visits, plus the running totals — under
// BOTH metrics, regardless of which one drove the routing decision — at each,
// so the UI can always show chars and syllables side by side.
function computeVisited(
    script: Script,
    path: string[],
    startNode: string,
    initialContext: Context,
): {
    visitedNodeIds: string[];
    cumulativeCounts: { chars: Record<string, number>; syllables: Record<string, number> };
    totals: { chars: number; syllables: number };
} {
    const visited: string[] = [];
    const cumulativeChars: Record<string, number> = {};
    const cumulativeSyllables: Record<string, number> = {};
    let nodeId: string = startNode;
    let context: Context = {...initialContext};
    let pathIdx = 0;
    let runningChars = 0;
    let runningSyllables = 0;

    while (pathIdx < path.length) {
        const node = script[nodeId];
        /* istanbul ignore next -- defensive: the path always references real nodes */
        if (!node) {break;}

        visited.push(nodeId);

        if ("choices" in node) {
            cumulativeChars[nodeId] = runningChars;
            cumulativeSyllables[nodeId] = runningSyllables;

            const choiceName = path[pathIdx++];
            const choiceIdx = node.choices.findIndex((c) => c.name === choiceName);
            /* istanbul ignore next -- defensive: the path's choice name always matches */
            if (choiceIdx === -1) {break;}
            const choice = node.choices[choiceIdx]!;
            const ciId = `${nodeId}__ci${choiceIdx}`;
            visited.push(ciId);

            runningChars += calculateDialogueLength(choice.text);
            runningSyllables += calculateDialogueSyllables(choice.text);
            cumulativeChars[ciId] = runningChars;
            cumulativeSyllables[ciId] = runningSyllables;

            context = applySets(context, choice.set);

            if (choice.next === undefined) {break;}
            const next = getNextNode(choice.next, context);
            if (!next) {break;}
            if (Array.isArray(choice.next)) {
                const j = choice.next.findIndex((c) => evaluateCondition(c, context));
                visited.push(isSingleVariableFork(choice.next) ? `${ciId}__cond` : `${ciId}__cond${j}`);
            }
            nodeId = next;
        } else {
            runningChars += calculateDialogueLength(node.text);
            runningSyllables += calculateDialogueSyllables(node.text);
            cumulativeChars[nodeId] = runningChars;
            cumulativeSyllables[nodeId] = runningSyllables;

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
        cumulativeCounts: {
            chars: cumulativeChars,
            syllables: cumulativeSyllables
        },
        totals: {
            chars: runningChars,
            syllables: runningSyllables
        }
    };
}

// Run the shortest-path search and package the full response the UI needs.
// `metric` selects which unit the search minimizes; defaults to syllables (a
// closer proxy for spoken duration than raw character count).
export function runTraverse(
    script: Script,
    startNode = "start",
    initialContext: Context = {},
    metric: Metric = "syllables",
): TraverseResponse {
    const [, path, context] = traverse(script, startNode, 0, initialContext, metric);
    const {visitedNodeIds, cumulativeCounts, totals} = computeVisited(script, path, startNode, initialContext);
    return {
        metric,
        counts: totals,
        path,
        context,
        visitedNodeIds,
        cumulativeCounts
    };
}
