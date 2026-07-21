import {Script, Context, Metric} from "./types";
import {weighDialogue} from "./weighDialogue";
import {getNextNode} from "./getNextNode";
import {applySets} from "./applySets";

type Result = [number, string[], Context];

// Cache keyed per Script object so different scripts sharing node ids (e.g.
// "start") never collide.
//
// Soundness note: a node's shortest onward cost is memoised on (nodeId,
// context) — the `visited` set is deliberately NOT part of the key. This is
// exact for any DAG. The proof: the cached suffix cost of a node X could only
// depend on the current path's visited set if X's cheapest suffix routes back
// to a node already on that path; because node ids are unique, "routing back"
// is necessarily a back-edge (a cycle). So on a DAG the memo is always exact.
//
// The only way to poison the cache is a genuine back-edge that lies on some
// node's cheapest suffix — and even then the failure mode is safe: the
// `visited` guard below prunes the re-entry to Infinity, so a poisoned entry
// can only make a route look UNREACHABLE (over-prune), never cheaper than it
// is. The pathfinder therefore never returns a too-low cost; at worst it would
// miss a route that is only reachable by re-entering an already-visited node.
// The shipped corpus contains back-edges (self-loops, and one 2-node back-edge
// in episode 4) but none lie on an optimal path, so every script resolves to a
// finite shortest route — a property the corpus finiteness test locks in.
//
// A fully general fix (supporting a cheap route reachable only via a back-edge)
// would search the (node, context) state space directly, e.g. Dijkstra, rather
// than memoising a DFS.
const caches = new WeakMap<Script, Map<string, Result>>();

// Public entry point: find the shortest onward route from `nodeId`. The cycle-
// guard `visited` set is an internal recursion detail, so it's kept off this
// signature — callers can't accidentally (or maliciously) seed it and poison
// pathfinding to Infinity.
//
// `metric` selects the unit being minimized — defaults to "chars" so this
// stays the same pure character-counting engine it always was; callers that
// want syllable-based (speech-time) routing pass metric explicitly.
export const traverse = (script: Script, nodeId: string, currentLength: number, context: Context, metric: Metric = "chars"): Result =>
    traverseFrom(script, nodeId, currentLength, context, new Set(), metric);

const traverseFrom = (script: Script, nodeId: string, currentLength: number, context: Context, visited: Set<string>, metric: Metric): Result => {
    let cache = caches.get(script);
    if (!cache) {
        cache = new Map<string, Result>();
        caches.set(script, cache);
    }

    // Metric is part of the key: the same (nodeId, context) has a different
    // marginal cost under each metric, and both may be queried against the
    // same script (the UI shows chars and syllables side by side).
    const cacheKey = `${metric}-${nodeId}-${JSON.stringify(context)}`;
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
        const dialogueLength = weighDialogue(currentNode.text, metric);
        const nextNodeId = getNextNode(currentNode.next, context);
        if (!nextNodeId) {
            return [currentLength + dialogueLength, [nodeId], context];
        }
        const [pathLength, path, newContext] = traverseFrom(script, nextNodeId, currentLength + dialogueLength, context, childVisited, metric);
        return [pathLength, [nodeId, ...path], newContext];
    }

    let shortestLength = Infinity;
    let shortestPath: string[] = [];
    let shortestContext: Context = context;

    for (const choice of currentNode.choices) {
        const dialogueLength = weighDialogue(choice.text, metric);
        const nextNodeId = getNextNode(choice.next, context);

        const choiceContext = applySets(context, choice.set);

        if (!nextNodeId) {
            if (currentLength + dialogueLength < shortestLength) {
                shortestLength = currentLength + dialogueLength;
                shortestPath = [choice.name];
                shortestContext = choiceContext;
            }
            continue;
        }

        const [pathLength, path, newContext] = traverseFrom(script, nextNodeId, currentLength + dialogueLength, choiceContext, childVisited, metric);
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
