import {describe, it, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import type {NodeProps} from "@xyflow/react";
import {ChoiceNode} from "../ChoiceNode";
import {ChoiceItemNode} from "../ChoiceItemNode";
import {LinearNode} from "../LinearNode";

vi.mock("@xyflow/react", () => ({
    Handle: (): null => null,
    Position: {Top: "top", Bottom: "bottom"},
}));

// The node components read a GraphNode off NodeProps.data; build a minimal one.
const props = (data: Record<string, unknown>, selected = false): NodeProps =>
    ({data, selected} as unknown as NodeProps);

describe("ChoiceNode", () => {
    it("renders the id, plain by default", () => {
        const {container} = render(<ChoiceNode {...props({id: "x"})} />);
        expect(screen.getByText("x")).toBeInTheDocument();
        expect(container.querySelector(".choice-node")!.className).toBe("dialogue-node choice-node");
    });

    it("adds selected and highlighted classes", () => {
        const {container} = render(<ChoiceNode {...props({id: "x", highlighted: true}, true)} />);
        const cls = container.querySelector(".choice-node")!.className;
        expect(cls).toContain("selected");
        expect(cls).toContain("highlighted");
    });
});

describe("ChoiceItemNode", () => {
    it("renders the choice name and a short preview", () => {
        render(<ChoiceItemNode {...props({choiceName: "Pick", text: "hi there", isTerminal: false})} />);
        expect(screen.getByText("Pick")).toBeInTheDocument();
        expect(screen.getByText("hi there")).toBeInTheDocument();
    });

    it("truncates a long preview", () => {
        render(<ChoiceItemNode {...props({choiceName: "c", text: "x".repeat(60), isTerminal: false})} />);
        expect(screen.getByText(/…$/)).toBeInTheDocument();
    });

    it("takes the first line from an array and handles an empty first line", () => {
        const {rerender, container} = render(<ChoiceItemNode {...props({choiceName: "c", text: ["first line"], isTerminal: false})} />);
        expect(screen.getByText("first line")).toBeInTheDocument();
        rerender(<ChoiceItemNode {...props({choiceName: "c", text: [""], isTerminal: false})} />);
        expect(container.querySelector(".ci-preview")!).toHaveTextContent("");
    });

    it("omits the preview when there is no text", () => {
        const {container} = render(<ChoiceItemNode {...props({choiceName: "c", isTerminal: true})} />);
        expect(container.querySelector(".ci-preview")).toBeNull();
    });

    it("renders sets when present and marks terminal/selected/highlighted", () => {
        const {container} = render(<ChoiceItemNode {...props({
            choiceName: "c", text: "t", isTerminal: true, highlighted: true,
            sets: [{name: "f", type: "set", value: true}],
        }, true)} />);
        expect(container).toHaveTextContent("f=true");
        const cls = container.querySelector(".choice-item-node")!.className;
        expect(cls).toContain("selected");
        expect(cls).toContain("highlighted");
        expect(cls).toContain("terminal");
    });
});

describe("LinearNode", () => {
    it("renders id and a text preview", () => {
        render(<LinearNode {...props({id: "L", text: "hello", isTerminal: false})} />);
        expect(screen.getByText("L")).toBeInTheDocument();
        expect(screen.getByText("hello")).toBeInTheDocument();
    });

    it("shows a placeholder when there is no text (and for an empty first line)", () => {
        const {rerender} = render(<LinearNode {...props({id: "L", isTerminal: false})} />);
        expect(screen.getByText("(no text)")).toBeInTheDocument();
        rerender(<LinearNode {...props({id: "L", text: [""], isTerminal: false})} />);
        expect(screen.getByText("(no text)")).toBeInTheDocument();
    });

    it("truncates a long preview, takes the first array line, and marks terminal/selected/highlighted", () => {
        const {container, rerender} = render(<LinearNode {...props({id: "L", text: "y".repeat(60), isTerminal: true, highlighted: true}, true)} />);
        expect(screen.getByText(/…$/)).toBeInTheDocument();
        const cls = container.querySelector(".linear-node")!.className;
        expect(cls).toContain("terminal");
        expect(cls).toContain("selected");
        expect(cls).toContain("highlighted");
        rerender(<LinearNode {...props({id: "L", text: ["arr line"], isTerminal: false})} />);
        expect(screen.getByText("arr line")).toBeInTheDocument();
    });
});
