import {traverse} from "@sdr/engine";
import {SCRIPTS} from "../index";

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
});
