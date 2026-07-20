import {describe, it, expect, vi, beforeAll} from "vitest";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import {buildGraph, runTraverse} from "@sdr/graph";
import {SCRIPTS} from "@sdr/scripts";
import {GraphCanvas} from "../GraphCanvas";

// happy-dom returns 0 for layout; give the canvas and cards real dimensions so
// heights measure, posNodes lays out, and the full graph renders.
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {configurable: true, get: () => 50});
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {configurable: true, get: () => 800});
    HTMLElement.prototype.getBoundingClientRect = (): DOMRect =>
        ({left: 0, top: 0, right: 800, bottom: 600, width: 800, height: 600, x: 0, y: 0, toJSON: () => ({})});
    Object.defineProperty(document, "fonts", {configurable: true, value: {ready: Promise.resolve()}});
});

const ep3 = SCRIPTS.find((s) => s.id === "lifeisstrange/episode3")!.script;
const g = buildGraph("lifeisstrange/episode3", ep3);
const traversal = runTraverse(ep3, "start", {});

function renderCanvas(overrides: Partial<React.ComponentProps<typeof GraphCanvas>> = {}): {
    onNodeClick: ReturnType<typeof vi.fn>; container: HTMLElement;
} {
    const onNodeClick = vi.fn();
    const {container} = render(
        <GraphCanvas
            scriptId="lifeisstrange/episode3"
            graphNodes={g.nodes}
            graphEdges={g.edges}
            visitedNodeIds={new Set(traversal.visitedNodeIds)}
            selectedNodeId={null}
            onNodeClick={onNodeClick}
            cumulativeCounts={traversal.cumulativeCounts}
            {...overrides}
        />,
    );
    return {onNodeClick, container};
}

describe("GraphCanvas", () => {
    it("renders the empty prompt when there are no nodes", () => {
        const {container} = renderCanvas({graphNodes: [], graphEdges: []});
        expect(container.querySelector(".canvas-empty")).not.toBeNull();
    });

    it("lays out and renders the graph, TOC, controls, and minimap", async () => {
        const {container} = renderCanvas({selectedNodeId: "campus_1"});
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        // node layer laid out
        expect(container.querySelectorAll(".dialogue-node, .choice-item-node, .condition-item-node").length).toBeGreaterThan(0);
        // inherited-decision cards (ep3 has setup forks)
        expect(container.querySelector(".inherited-card")).not.toBeNull();
        // TOC present (ep3 has outline entries whose nodes exist)
        expect(container.querySelector(".toc-panel")).not.toBeNull();
        // minimap
        expect(container.querySelector(".minimap")).not.toBeNull();
    });

    it("fires onNodeClick for a plain click but not after a drag", async () => {
        const {onNodeClick, container} = renderCanvas();
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        const canvas = container.querySelector(".graph-canvas") as HTMLElement;
        // pick a card in the VISIBLE layer (the hidden measurement layer is aria-hidden with a NOOP handler)
        const card = [...container.querySelectorAll(".choice-item-node, .dialogue-node")]
            .find((el) => !el.closest("[aria-hidden]"))!;
        // plain click → fires
        fireEvent.click(card);
        expect(onNodeClick).toHaveBeenCalled();
        onNodeClick.mockClear();
        // drag then release → click is suppressed
        fireEvent.mouseDown(canvas, {button: 0, clientX: 0, clientY: 0});
        fireEvent.mouseMove(canvas, {clientX: 40, clientY: 40});
        fireEvent.mouseUp(canvas);
        fireEvent.click(card);
        expect(onNodeClick).not.toHaveBeenCalled();
        // a sub-threshold move keeps it a click (movedRef stays false)
        fireEvent.mouseDown(canvas, {button: 0, clientX: 0, clientY: 0});
        fireEvent.mouseMove(canvas, {clientX: 2, clientY: 2});
        fireEvent.mouseUp(canvas);
        // clicking a hidden measurement-layer card runs the NOOP handler
        const hidden = container.querySelector("[aria-hidden] .choice-item-node, [aria-hidden] .dialogue-node")!;
        fireEvent.click(hidden);
    });

    it("ignores non-left drags and stops propagation on the panels", async () => {
        const {container} = renderCanvas();
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        const canvas = container.querySelector(".graph-canvas") as HTMLElement;
        fireEvent.mouseDown(canvas, {button: 2}); // right-click → ignored
        fireEvent.mouseMove(canvas, {clientX: 30, clientY: 30}); // no drag started → no-op
        fireEvent.mouseDown(container.querySelector(".toc-panel") as HTMLElement);
        fireEvent.mouseDown(container.querySelector(".canvas-controls") as HTMLElement);
        expect(canvas).toBeInTheDocument();
    });

    it("handles wheel pan and ctrl+wheel zoom without throwing", async () => {
        const {container} = renderCanvas();
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        const canvas = container.querySelector(".graph-canvas") as HTMLElement;
        const wheel = (init: WheelEventInit & {ctrlKey?: boolean; metaKey?: boolean}): void => {
            const ev = new WheelEvent("wheel", {bubbles: true, cancelable: true, ...init});
            // happy-dom's WheelEvent constructor drops modifier keys; force them.
            if (init.ctrlKey) {Object.defineProperty(ev, "ctrlKey", {value: true});}
            if (init.metaKey) {Object.defineProperty(ev, "metaKey", {value: true});}
            act(() => { canvas.dispatchEvent(ev); });
        };
        wheel({deltaX: 10, deltaY: 20});          // plain → pan
        wheel({deltaY: -5, ctrlKey: true});       // ctrl + wheel up → zoom in
        wheel({deltaY: 5, metaKey: true});        // meta + wheel down → zoom out
        expect(canvas).toBeInTheDocument();
    });

    it("responds to the zoom, pan, and reset controls", async () => {
        const {container} = renderCanvas();
        await waitFor(() => container.querySelector(".graph-canvas"));
        for (const label of ["Zoom in", "Zoom out", "Pan up", "Pan down", "Pan left", "Pan right", "Reset view"]) {
            fireEvent.click(screen.getByLabelText(label));
        }
        expect(container.querySelector(".graph-canvas")).not.toBeNull();
    });

    it("navigates via the table of contents", async () => {
        const {container} = renderCanvas();
        await waitFor(() => container.querySelector(".toc-panel"));
        const items = container.querySelectorAll(".toc-item");
        fireEvent.click(items[items.length - 1]!); // jump to last entry
        fireEvent.click(screen.getByText(/Prev/));
        fireEvent.click(screen.getByText(/Next/));
        expect(container.querySelector(".toc-item.active")).not.toBeNull();
    });

    it("navigates via the minimap drag", async () => {
        const {container} = renderCanvas();
        const mm = await waitFor(() => container.querySelector(".minimap") as SVGElement);
        fireEvent.mouseDown(mm, {clientX: 10, clientY: 20});
        fireEvent.mouseMove(mm, {clientX: 10, clientY: 40});
        fireEvent.mouseUp(mm);
        fireEvent.mouseDown(mm, {clientX: 5, clientY: 5});
        fireEvent.mouseLeave(mm);
        expect(mm).toBeInTheDocument();
    });
});

// Small hand-built graphs to exercise the presentation branches (card
// selected/highlighted per type, edge colours) and the inherited-fork detection
// edge cases, which the fixed episode graph doesn't hit exhaustively.
type N = import("@sdr/shared").GraphNode;
type E = import("@sdr/shared").GraphEdge;
const gn = (id: string, over: Partial<N> = {}): N => ({id, type: "linear", isTerminal: false, ...over});
const ge = (source: string, target: string, edgeType: E["edgeType"]): E => ({id: `${source}->${target}`, source, target, edgeType});

describe("GraphCanvas — presentation branches", () => {
    const nodes: N[] = [
        gn("ch", {type: "choice"}),
        gn("ci", {type: "choiceItem", choiceName: "Pick", text: "t", sets: [{name: "f", type: "set", value: true}]}),
        gn("cnd", {type: "conditionItem", condition: "f = true"}),
        gn("lin", {type: "linear", text: "hello", isTerminal: true}),
    ];
    const edges: E[] = [
        ge("ch", "ci", "choice"),        // visited both ends → highlighted stroke
        ge("ch", "lin", "choice"),       // choice stroke
        ge("ci", "cnd", "conditional"),  // conditional stroke
        ge("cnd", "lin", "linear"),      // linear stroke
    ];

    it("renders every node/edge variant across selected and highlighted states", async () => {
        const base = {
            scriptId: "none",
            graphNodes: nodes,
            graphEdges: edges,
            onNodeClick: vi.fn(),
            cumulativeCounts: {},
        };
        const {container, rerender} = render(
            <GraphCanvas {...base} visitedNodeIds={new Set(["ch", "ci"])} selectedNodeId="ch" />,
        );
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        for (const id of ["ci", "cnd", "lin"]) {
            rerender(<GraphCanvas {...base} visitedNodeIds={new Set(["ch", "ci", "cnd", "lin"])} selectedNodeId={id} />);
        }
        // all-unselected / unvisited state
        rerender(<GraphCanvas {...base} visitedNodeIds={new Set()} selectedNodeId={null} />);
        expect(container.querySelector(".graph-canvas")).not.toBeNull();
    });

    it("treats an almost-fork start as content (each fork condition can fail)", async () => {
        const almostForks: N[][] = [
            // items carry text → not a fork
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", text: "x", sets: [{name: "f", type: "set", value: true}]}), gn("start__ci1", {type: "choiceItem", text: "y", sets: [{name: "f", type: "set", value: false}]}), gn("z")],
            // only one option → not a fork
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", sets: [{name: "f", type: "set", value: true}]}), gn("z")],
            // options set multiple flags → not a fork
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", sets: [{name: "f", type: "set", value: true}, {name: "g", type: "set", value: 1}]}), gn("start__ci1", {type: "choiceItem", sets: [{name: "f", type: "set", value: false}, {name: "g", type: "set", value: 2}]}), gn("z")],
            // options lead to different targets → not a fork
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", sets: [{name: "f", type: "set", value: true}]}), gn("start__ci1", {type: "choiceItem", sets: [{name: "f", type: "set", value: false}]}), gn("y"), gn("z")],
        ];
        const forkEdges: E[][] = [
            [ge("start", "start__ci0", "choice"), ge("start", "start__ci1", "choice"), ge("start__ci0", "z", "choice"), ge("start__ci1", "z", "choice")],
            [ge("start", "start__ci0", "choice"), ge("start__ci0", "z", "choice")],
            [ge("start", "start__ci0", "choice"), ge("start", "start__ci1", "choice"), ge("start__ci0", "z", "choice"), ge("start__ci1", "z", "choice")],
            [ge("start", "start__ci0", "choice"), ge("start", "start__ci1", "choice"), ge("start__ci0", "y", "choice"), ge("start__ci1", "z", "choice")],
        ];
        for (let i = 0; i < almostForks.length; i++) {
            const {container, unmount} = render(
                <GraphCanvas scriptId={undefined} graphNodes={almostForks[i]!} graphEdges={forkEdges[i]!} visitedNodeIds={new Set()} selectedNodeId={null} onNodeClick={vi.fn()} cumulativeCounts={{}} />,
            );
            await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
            expect(container.querySelector(".inherited-card")).toBeNull(); // no fork detected
            unmount();
        }
    });

    const renderGraph = async (n: N[], e: E[]): Promise<HTMLElement> => {
        const {container} = render(
            <GraphCanvas scriptId="none" graphNodes={n} graphEdges={e} visitedNodeIds={new Set()} selectedNodeId={null} onNodeClick={vi.fn()} cumulativeCounts={{}} />,
        );
        await waitFor(() => expect(container.querySelector(".graph-canvas")).not.toBeNull());
        return container;
    };

    it("detects a fork whose options have no choiceName label", async () => {
        const c = await renderGraph(
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", sets: [{name: "f", type: "set", value: true}]}), gn("start__ci1", {type: "choiceItem", sets: [{name: "f", type: "set", value: false}]}), gn("content", {type: "linear", text: "c", isTerminal: true})],
            [ge("start", "start__ci0", "choice"), ge("start", "start__ci1", "choice"), ge("start__ci0", "content", "choice"), ge("start__ci1", "content", "choice")],
        );
        expect(c.querySelector(".inherited-card")).not.toBeNull();
    });

    it("handles a start node with no children and a fork option with no target", async () => {
        await renderGraph([gn("start", {type: "choice"}), gn("x")], []); // start has no outgoing edges
        await renderGraph(
            [gn("start", {type: "choice"}), gn("start__ci0", {type: "choiceItem", sets: [{name: "f", type: "set", value: true}]}), gn("start__ci1", {type: "choiceItem", sets: [{name: "f", type: "set", value: false}]}), gn("z")],
            [ge("start", "start__ci0", "choice"), ge("start", "start__ci1", "choice"), ge("start__ci0", "z", "choice")], // ci1 has no target
        );
    });

    it("renders a terminal choiceItem card", async () => {
        const c = await renderGraph(
            [gn("a", {type: "choice"}), gn("a__ci0", {type: "choiceItem", choiceName: "end", text: "t", isTerminal: true})],
            [ge("a", "a__ci0", "choice")],
        );
        expect(c.querySelector(".choice-item-node.terminal")).not.toBeNull();
    });
});
