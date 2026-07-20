import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import type {ScriptMeta, GraphResponse, GraphNode, TraverseResponse} from "@sdr/shared";
import App from "./App";
import {fetchScripts, fetchGraph, postTraverse} from "./api";

vi.mock("./api", () => ({
    fetchScripts: vi.fn(),
    fetchGraph: vi.fn(),
    postTraverse: vi.fn()
}));

// Stub the heavy canvas: expose the scriptId/node-count it received and a way to
// fire a node click, so App's selection wiring can be exercised.
vi.mock("./components/GraphCanvas", () => ({
    GraphCanvas: (p: {scriptId: string; graphNodes: unknown[]; onNodeClick: (id: string)=> void}): JSX.Element => (
        <div data-testid="canvas">
            <span data-testid="info">{p.scriptId}|{p.graphNodes.length}</span>
            <button data-testid="fire-node" onClick={() => p.onNodeClick("N1")}>fire-node</button>
        </div>
    ),
}));

const meta = (over: Partial<ScriptMeta> = {}): ScriptMeta => ({
    id: "g/e1",
    game: "g",
    episode: "e1",
    nodeCount: 5,
    ...over
});
const graph = (nodes: GraphNode[] = []): GraphResponse => ({
    scriptId: "g/e1",
    nodes,
    edges: []
});
const linear = (id: string): GraphNode => ({
    id,
    type: "linear",
    isTerminal: true,
    text: "hi"
});
const traversal = (over: Partial<TraverseResponse> = {}): TraverseResponse =>
    ({
        length: 3,
        path: ["a"],
        context: {f: true},
        visitedNodeIds: ["a"],
        cumulativeCounts: {a: 1},
        ...over
    });

// Default happy-path mocks so the chained mount effects never hit an undefined
// return; individual tests override the specific call they exercise.
beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchScripts).mockResolvedValue({scripts: [meta()]});
    vi.mocked(fetchGraph).mockResolvedValue(graph([linear("N1")]));
    vi.mocked(postTraverse).mockResolvedValue(traversal());
});

// Render and wait for the graph load triggered by the two chained mount effects.
const renderLoaded = async (): Promise<void> => {
    render(<App />);
    await waitFor(() => expect(fetchGraph).toHaveBeenCalled());
    await screen.findByTestId("canvas");
};

describe("App", () => {
    it("loads scripts, auto-selects the first, and loads its graph", async () => {
        await renderLoaded();
        expect(screen.getByTestId("info")).toHaveTextContent("g/e1|1");
        expect(fetchGraph).toHaveBeenCalledWith("g", "e1");
    });

    it("does nothing further when there are no scripts", async () => {
        vi.mocked(fetchScripts).mockResolvedValue({scripts: []});
        render(<App />);
        await waitFor(() => expect(fetchScripts).toHaveBeenCalled());
        expect(fetchGraph).not.toHaveBeenCalled();
    });

    it("logs when loading scripts fails", async () => {
        const err = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.mocked(fetchScripts).mockRejectedValue(new Error("boom"));
        render(<App />);
        await waitFor(() => expect(err).toHaveBeenCalled());
        err.mockRestore();
    });

    it("skips graph loading for a malformed script id", async () => {
        vi.mocked(fetchScripts).mockResolvedValue({scripts: [meta({id: "noslash"})]});
        render(<App />);
        await waitFor(() => expect(fetchScripts).toHaveBeenCalled());
        expect(fetchGraph).not.toHaveBeenCalled();
    });

    it("clears the loading state and logs when graph loading fails", async () => {
        const err = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.mocked(fetchGraph).mockRejectedValue(new Error("no graph"));
        render(<App />);
        await waitFor(() => expect(err).toHaveBeenCalled());
        expect(await screen.findByTestId("canvas")).toBeInTheDocument();
        err.mockRestore();
    });

    it("runs a traversal and shows the result", async () => {
        await renderLoaded();
        fireEvent.click(screen.getByRole("button", {name: /Find Shortest Path/}));
        await waitFor(() => expect(document.querySelector(".context-inspector")).not.toBeNull());
    });

    it("logs when a traversal fails", async () => {
        const err = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.mocked(postTraverse).mockRejectedValue(new Error("fail"));
        await renderLoaded();
        fireEvent.click(screen.getByRole("button", {name: /Find Shortest Path/}));
        await waitFor(() => expect(err).toHaveBeenCalled());
        err.mockRestore();
    });

    it("opens the sidebar for a clicked node and closes it", async () => {
        await renderLoaded();
        fireEvent.click(screen.getByTestId("fire-node"));
        expect(await screen.findByRole("heading", {name: "N1"})).toBeInTheDocument();
        fireEvent.click(document.querySelector(".close-btn") as HTMLElement);
        await waitFor(() => expect(screen.queryByRole("heading", {name: "N1"})).not.toBeInTheDocument());
    });

    it("shows no sidebar when the clicked node id is not in the graph", async () => {
        vi.mocked(fetchGraph).mockResolvedValue(graph([linear("OTHER")]));
        await renderLoaded();
        fireEvent.click(screen.getByTestId("fire-node"));
        expect(screen.queryByRole("heading", {name: "N1"})).not.toBeInTheDocument();
    });

    it("reloads the graph when a different script is selected", async () => {
        vi.mocked(fetchScripts).mockResolvedValue({
            scripts: [meta(), meta({
                id: "g/e2",
                episode: "e2"
            })]
        });
        await renderLoaded();
        fireEvent.change(screen.getByRole("combobox"), {target: {value: "g/e2"}});
        await waitFor(() => expect(fetchGraph).toHaveBeenCalledWith("g", "e2"));
    });
});
