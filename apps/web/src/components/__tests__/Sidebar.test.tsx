import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {Sidebar} from "../Sidebar";
import type {GraphNode} from "@sdr/shared";

const node = (over: Partial<GraphNode>): GraphNode => ({id: "n1", type: "linear", isTerminal: false, ...over});

describe("Sidebar", () => {
    it("renders nothing without a node", () => {
        const {container} = render(<Sidebar node={null} onClose={() => {}} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders a linear node's array text and fires onClose", () => {
        const onClose = vi.fn();
        render(<Sidebar node={node({type: "linear", text: ["l1", "l2"]})} onClose={onClose} />);
        expect(screen.getByText("l1")).toBeInTheDocument();
        expect(screen.getByText("l2")).toBeInTheDocument();
        fireEvent.click(screen.getByText("✕"));
        expect(onClose).toHaveBeenCalled();
    });

    it("renders a linear node's string text", () => {
        render(<Sidebar node={node({type: "linear", text: "hello"})} onClose={() => {}} />);
        expect(screen.getByText("hello")).toBeInTheDocument();
    });

    it("renders a linear node with no text (TextBlock returns null)", () => {
        const {container} = render(<Sidebar node={node({type: "linear"})} onClose={() => {}} />);
        expect(container.querySelector(".text-block")).toBeNull();
    });

    it("renders a choice node description", () => {
        render(<Sidebar node={node({type: "choice"})} onClose={() => {}} />);
        expect(screen.getByText(/Branch point/)).toBeInTheDocument();
    });

    it("renders a choiceItem with its choiceName title and its sets", () => {
        const {container} = render(
            <Sidebar node={node({type: "choiceItem", choiceName: "Pick me", text: "t", sets: [{name: "f", type: "set", value: true}]})} onClose={() => {}} />,
        );
        expect(screen.getByText("Pick me")).toBeInTheDocument();
        expect(screen.getByText("Sets")).toBeInTheDocument();
        expect(container).toHaveTextContent("f = true");
    });

    it("falls back to the id and hides Sets when a choiceItem has neither", () => {
        render(<Sidebar node={node({type: "choiceItem", text: "t"})} onClose={() => {}} />);
        expect(screen.getByRole("heading", {name: "n1"})).toBeInTheDocument();
        expect(screen.queryByText("Sets")).not.toBeInTheDocument();
    });
});
