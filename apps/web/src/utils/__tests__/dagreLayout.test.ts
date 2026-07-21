import {describe, it, expect} from "vitest";
import {applyDagreLayout, type LayoutNode, type LayoutEdge} from "../dagreLayout";

const n = (id: string): LayoutNode => ({
    id,
    type: "linear",
    position: {
        x: 0,
        y: 0
    },
    style: {width: 420},
    data: {}
});
const e = (source: string, target: string): LayoutEdge => ({
    id: `${source}->${target}`,
    source,
    target
});
const rankY = (out: LayoutNode[], id: string): number => out.find((x) => x.id === id)!.position.y;

describe("applyDagreLayout", () => {
    it("returns the input untouched for an empty node list", () => {
        expect(applyDagreLayout([], [], new Map())).toEqual([]);
    });

    it("positions a lone node at the top rank (y=0)", () => {
        const out = applyDagreLayout([n("A")], [], new Map());
        expect(out[0]!.position.y).toBe(0);
    });

    it("ranks a linear chain top to bottom", () => {
        const out = applyDagreLayout([n("A"), n("B"), n("C")], [e("A", "B"), e("B", "C")], new Map());
        expect(rankY(out, "A")).toBeLessThan(rankY(out, "B"));
        expect(rankY(out, "B")).toBeLessThan(rankY(out, "C"));
    });

    it("ignores self-edges and edges to/from unknown nodes", () => {
        const out = applyDagreLayout([n("A"), n("B")], [e("A", "A"), e("A", "ghost"), e("ghost", "B"), e("A", "B")], new Map());
        expect(rankY(out, "A")).toBeLessThan(rankY(out, "B"));
    });

    it("handles a diamond: fan-out, fan-in, and a cross-edge to an already-visited node", () => {
        const nodes = [n("A"), n("B"), n("C"), n("D")];
        const edges = [e("A", "B"), e("A", "C"), e("B", "D"), e("C", "D")];
        const out = applyDagreLayout(nodes, edges, new Map());
        // A above B/C above D
        expect(rankY(out, "A")).toBeLessThan(rankY(out, "B"));
        expect(rankY(out, "B")).toBeLessThan(rankY(out, "D"));
        // B and C share a rank, laid out left-to-right and centred on 0
        const bx = out.find((x) => x.id === "B")!.position.x;
        const cx = out.find((x) => x.id === "C")!.position.x;
        expect(bx).toBeLessThan(cx);
        expect(bx + cx + 420).toBe(0); // node centres symmetric about x=0 (width 420)
    });

    it("re-ranks a merge point to its longest path (short + long path to same node)", () => {
        // A->C (len 1) and A->B->C (len 2); C should land at rank 2, below B
        const out = applyDagreLayout([n("A"), n("B"), n("C")], [e("A", "C"), e("A", "B"), e("B", "C")], new Map());
        expect(rankY(out, "C")).toBeGreaterThan(rankY(out, "B"));
    });

    it("breaks a cycle via back-edge detection and still ranks every node", () => {
        const out = applyDagreLayout([n("A"), n("B"), n("C")], [e("A", "B"), e("B", "C"), e("C", "A")], new Map());
        expect(rankY(out, "A")).toBeLessThan(rankY(out, "B"));
        expect(rankY(out, "B")).toBeLessThan(rankY(out, "C"));
    });

    it("falls back to the first node as start when the graph has no roots", () => {
        // pure 2-cycle: neither node is a root
        const out = applyDagreLayout([n("A"), n("B")], [e("A", "B"), e("B", "A")], new Map());
        expect(out).toHaveLength(2);
        expect(rankY(out, "A")).toBeLessThan(rankY(out, "B"));
    });

    it("places nodes unreachable from any root at the bottom", () => {
        // R->X reachable; Y<->Z an isolated cycle, unreachable from R
        const out = applyDagreLayout(
            [n("R"), n("X"), n("Y"), n("Z")],
            [e("R", "X"), e("Y", "Z"), e("Z", "Y")],
            new Map(),
        );
        const bottom = Math.max(rankY(out, "R"), rankY(out, "X"));
        expect(rankY(out, "Y")).toBeGreaterThan(bottom);
        expect(rankY(out, "Z")).toBeGreaterThan(bottom);
    });

    it("uses measured heights where present and the fallback height otherwise", () => {
        const tall = applyDagreLayout([n("A"), n("B")], [e("A", "B")], new Map([["A", 500]]));
        const short = applyDagreLayout([n("A"), n("B")], [e("A", "B")], new Map([["A", 20]]));
        // B sits further down when A is taller
        expect(rankY(tall, "B")).toBeGreaterThan(rankY(short, "B"));
    });

    describe("horizontal direction", () => {
        const rankX = (out: LayoutNode[], id: string): number => out.find((x) => x.id === id)!.position.x;

        it("advances ranks along X and stacks siblings down Y", () => {
            const nodes = [n("A"), n("B"), n("C"), n("D")];
            const edges = [e("A", "B"), e("A", "C"), e("B", "D"), e("C", "D")];
            const out = applyDagreLayout(nodes, edges, new Map(), "horizontal");
            // A left of B/C left of D (ranks advance rightward)
            expect(rankX(out, "A")).toBeLessThan(rankX(out, "B"));
            expect(rankX(out, "B")).toBeLessThan(rankX(out, "D"));
            // B and C share a column, stacked vertically and centred on 0
            const by = out.find((x) => x.id === "B")!.position.y;
            const cy = out.find((x) => x.id === "C")!.position.y;
            expect(by).toBeLessThan(cy);
            expect(by).toBeLessThan(0);
            expect(cy).toBeGreaterThan(0);
        });

        it("widens the column gap for a taller node in horizontal mode", () => {
            const wide = applyDagreLayout([n("A"), n("B")], [e("A", "B")], new Map(), "horizontal");
            // B is to the right of A by at least A's width
            expect(rankX(wide, "B")).toBeGreaterThanOrEqual(rankX(wide, "A") + 420);
        });
    });
});
