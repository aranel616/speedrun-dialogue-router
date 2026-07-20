import {Script, Context} from "./types";
import {calculateDialogueLength} from "./calculateDialogueLength";
import {getNextNode} from "./getNextNode";

type Result = [number, string[], Context];

// Cache keyed per Script object so different scripts sharing node ids (e.g.
// "start") never collide.
//
// Soundness note: a node's shortest onward cost is memoised on (nodeId,
// context). Scripts are expected to be DAGs (rewinds are modelled as forward
// nodes), but the corpus does contain the occasional back-edge on a branch the
// shortest path never takes — the `visited` guard below prunes such a branch to
// Infinity so the pathfinder avoids it. This is correct for the current corpus;
// a script where a cheap route is only reachable by re-entering an already-
// visited node from a *different* entry could in theory read a stale cached
// cost. A fully general fix would search the (node, context) state space
// directly (e.g. Dijkstra) rather than memoising a DFS.
const caches = new WeakMap<Script, Map<string, Result>>();

export const traverse = (script: Script, nodeId: string, currentLength: number, context: Context, visited: Set<string> = new Set()): Result => {
    let cache = caches.get(script);
    if (!cache) {
        cache = new Map<string, Result>();
        caches.set(script, cache);
    }

    const cacheKey = `${nodeId}-${JSON.stringify(context)}`;
    if (cache.has(cacheKey)) {
        const cacheHit = cache.get(cacheKey)!;
        return [currentLength + cacheHit[0], cacheHit[1], cacheHit[2]];
    }

    if (!nodeId) {
        return [currentLength, [], context];
    }

    // Cycle guard: revisiting a node on the current path is a back-edge; treat
    // it as unreachable so the pathfinder prefers a non-cyclic route.
    if (visited.has(nodeId)) {
        return [Infinity, [], context];
    }
    const childVisited = new Set(visited);
    childVisited.add(nodeId);

    const currentNode = script[nodeId];
    if (!currentNode) {
        throw new Error(`Node not found: "${nodeId}"`);
    }

    if ("text" in currentNode) {
        const dialogueLength = calculateDialogueLength(currentNode.text);
        const nextNodeId = getNextNode(currentNode.next, context);
        if (!nextNodeId) {
            return [currentLength + dialogueLength, [nodeId], context];
        }
        const [pathLength, path, newContext] = traverse(script, nextNodeId, currentLength + dialogueLength, context, childVisited);
        return [pathLength, [nodeId, ...path], newContext];
    }

    let shortestLength = Infinity;
    let shortestPath: string[] = [];
    let shortestContext: Context = context;

    for (const choice of currentNode.choices) {
        const dialogueLength = calculateDialogueLength(choice.text);
        const nextNodeId = getNextNode(choice.next, context);

        const choiceContext = {...context};
        if (choice.set) {
            for (const setAction of Array.isArray(choice.set) ? choice.set : [choice.set]) {
                if (setAction.type === "set") {
                    choiceContext[setAction.name] = setAction.value;
                }
            }
        }

        if (!nextNodeId) {
            if (currentLength + dialogueLength < shortestLength) {
                shortestLength = currentLength + dialogueLength;
                shortestPath = [choice.name];
                shortestContext = choiceContext;
            }
            continue;
        }

        const [pathLength, path, newContext] = traverse(script, nextNodeId, currentLength + dialogueLength, choiceContext, childVisited);
        if (pathLength < shortestLength) {
            shortestLength = pathLength;
            shortestPath = [choice.name, ...path];
            shortestContext = newContext;
        }
    }

    // Store marginal cost (not total) so the entry is reusable from any prefix.
    const result: Result = [shortestLength, shortestPath, shortestContext];
    cache.set(cacheKey, [shortestLength - currentLength, shortestPath, shortestContext]);
    return result;
};
