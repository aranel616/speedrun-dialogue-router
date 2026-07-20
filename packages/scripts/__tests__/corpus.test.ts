import {traverse} from "@sdr/engine";
import type {Interaction, Next, Script} from "@sdr/engine";
import {SCRIPTS} from "../index";

// Every node id a node routes to (linear `next`, choice `next`, and each
// conditional branch's `node`). A ConditionalNext is an array of conditions.
function outgoingTargets(node: Interaction): string[] {
    const fromNext = (next: Next | undefined): string[] =>
        next === undefined ? [] : typeof next === "string" ? [next] : next.map((c) => c.node);
    return "choices" in node
        ? node.choices.flatMap((c) => fromNext(c.next))
        : fromNext(node.next);
}

function reachableFrom(script: Script, start: string): Set<string> {
    const seen = new Set<string>();
    const queue = [start];
    while (queue.length > 0) {
        const id = queue.shift()!;
        if (seen.has(id) || !script[id]) { continue; }
        seen.add(id);
        queue.push(...outgoingTargets(script[id]!));
    }
    return seen;
}

// The whole design leans on every shipped script resolving to a finite shortest
// route: the memoization is exact only on DAGs, and the visited-guard prunes any
// back-edge to Infinity (see the soundness note in engine/traverse.ts). The
// corpus does contain back-edges (self-loops, plus one 2-node back-edge in
// episode 4), so this guards the property they must never violate — a finite
// length with a real path — which would otherwise regress silently if a future
// dialogue-length edit flipped a back-edge onto the optimal route.
//
// traverse() is used directly rather than @sdr/graph's runTraverse so this test
// respects the dependency direction (scripts -> engine): finiteness lives
// entirely in traverse; runTraverse only wraps it with visited/cumulative data.
describe("corpus", () => {
    it("registers at least the five known episodes", () => {
        expect(SCRIPTS.length).toBeGreaterThanOrEqual(5);
    });

    it.each(SCRIPTS.map((s) => [s.id, s.script] as const))(
        "%s resolves to a finite shortest path from start",
        (_id, script) => {
            const [length, path] = traverse(script, "start", 0, {});
            expect(Number.isFinite(length)).toBe(true);
            expect(length).toBeGreaterThan(0);
            expect(path.length).toBeGreaterThan(0);
        },
    );

    // Structural integrity: a dangling target on a currently-non-optimal branch
    // is invisible to the finiteness check above (traverse never walks it) until
    // a future edit shifts the optimum onto it and it throws "Node not found" at
    // runtime. Validate the whole graph statically instead.
    it.each(SCRIPTS.map((s) => [s.id, s.script] as const))(
        "%s has a start node and no dangling edge targets",
        (_id, script) => {
            const ids = new Set(Object.keys(script));
            expect(ids.has("start")).toBe(true);
            const dangling: string[] = [];
            for (const [nodeId, node] of Object.entries(script)) {
                for (const target of outgoingTargets(node)) {
                    if (!ids.has(target)) { dangling.push(`${nodeId} -> ${target}`); }
                }
            }
            expect(dangling).toEqual([]);
        },
    );

    it.each(SCRIPTS.map((s) => [s.id, s.script] as const))(
        "%s has every node reachable from start",
        (_id, script) => {
            const reachable = reachableFrom(script, "start");
            const orphans = Object.keys(script).filter((id) => !reachable.has(id));
            expect(orphans).toEqual([]);
        },
    );
});
