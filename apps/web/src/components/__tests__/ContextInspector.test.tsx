import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {ContextInspector} from "../ContextInspector";
import type {TraverseResponse} from "@sdr/shared";

const result = (over: Partial<TraverseResponse> = {}): TraverseResponse => ({
    metric: "syllables",
    counts: {
        chars: 5,
        syllables: 2
    },
    path: ["a", "b"],
    context: {},
    visitedNodeIds: [],
    cumulativeCounts: {
        chars: {},
        syllables: {}
    },
    ...over,
});

describe("ContextInspector", () => {
    it("renders nothing when there is no result", () => {
        const {container} = render(<ContextInspector result={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders the syllable count (primary metric) and the char count as an aside", () => {
        render(<ContextInspector result={result()} />);
        expect(screen.getByText("2 syllables", {exact: false})).toBeInTheDocument();
        expect(screen.getByText("(5 chars)")).toBeInTheDocument();
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
    });

    it("renders the char count as primary when metric is 'chars'", () => {
        render(<ContextInspector result={result({metric: "chars"})} />);
        expect(screen.getByText("5 chars", {exact: false})).toBeInTheDocument();
        expect(screen.getByText("(2 syllables)")).toBeInTheDocument();
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
