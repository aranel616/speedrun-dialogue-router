import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {ContextInspector} from "../ContextInspector";
import type {TraverseResponse} from "@sdr/shared";

const result = (over: Partial<TraverseResponse> = {}): TraverseResponse => ({
    length: 5, path: ["a", "b"], context: {}, visitedNodeIds: [], cumulativeCounts: {}, ...over,
});

describe("ContextInspector", () => {
    it("renders nothing when there is no result", () => {
        const {container} = render(<ContextInspector result={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders the length and each path step", () => {
        render(<ContextInspector result={result()} />);
        expect(screen.getByText("5 chars")).toBeInTheDocument();
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
    });

    it("omits the context table when context is empty", () => {
        render(<ContextInspector result={result({context: {}})} />);
        expect(screen.queryByText("Final Context")).not.toBeInTheDocument();
    });

    it("renders the context table when there are entries", () => {
        const {container} = render(<ContextInspector result={result({context: {saved_kate: true}})} />);
        expect(screen.getByText("Final Context")).toBeInTheDocument();
        expect(screen.getByText("saved_kate")).toBeInTheDocument();
        expect(container).toHaveTextContent("true");
    });
});
