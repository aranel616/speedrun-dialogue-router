import {buildGraph, isSingleVariableFork} from "../index";
import type {Script, GetCondition} from "@sdr/engine";
import type {GraphNode, GraphResponse} from "@sdr/shared";

const node = (g: GraphResponse, id: string): GraphNode | undefined => g.nodes.find((n) => n.id === id);
const hasEdge = (g: GraphResponse, source: string, target: string): boolean =>
    g.edges.some((e) => e.source === source && e.target === target);
const edgeLabels = (g: GraphResponse, source: string): (string | undefined)[] =>
    g.edges.filter((e) => e.source === source).map((e) => e.label);

describe("isSingleVariableFork", () => {
    it("true when every branch tests the same variable", () => {
        expect(isSingleVariableFork([
            {
                name: "x",
                type: "eq",
                value: 1,
                node: "a"
            },
            {
                name: "x",
                type: "eq",
                value: 2,
                node: "b"
            },
        ])).toBe(true);
    });

    it("false when branches test different variables", () => {
        expect(isSingleVariableFork([
            {
                name: "x",
                type: "eq",
                value: 1,
                node: "a"
            },
            {
                name: "y",
                type: "eq",
                value: 2,
                node: "b"
            },
        ])).toBe(false);
    });

    it("false for an empty condition list", () => {
        expect(isSingleVariableFork([])).toBe(false);
    });
});

describe("buildGraph", () => {
    it("returns the scriptId and a terminal linear node for a lone node", () => {
        const g = buildGraph("game/ep", {A: {text: "hi"}});
        expect(g.scriptId).toBe("game/ep");
        expect(node(g, "A")).toMatchObject({
            type: "linear",
            text: "hi",
            isTerminal: true
        });
    });

    it("linear node with a string next → non-terminal + a linear edge", () => {
        const g = buildGraph("s", {
            A: {
                text: "x",
                next: "B"
            },
            B: {text: "y"}
        });
        expect(node(g, "A")!.isTerminal).toBe(false);
        expect(g.edges.find((e) => e.source === "A" && e.target === "B")!.edgeType).toBe("linear");
    });

    it("choice node emits a choice node + a choiceItem per branch, with edges", () => {
        const script: Script = {
            A: {
                choices: [
                    {
                        name: "go",
                        text: "hello",
                        next: "B"
                    },
                    {
                        name: "stop",
                        text: "bye"
                    },
                ]
            },
            B: {text: "z"},
        };
        const g = buildGraph("s", script);
        expect(node(g, "A")!.type).toBe("choice");
        expect(node(g, "A__ci0")).toMatchObject({
            type: "choiceItem",
            choiceName: "go",
            text: "hello",
            isTerminal: false
        });
        expect(node(g, "A__ci1")!.isTerminal).toBe(true); // no next
        expect(hasEdge(g, "A", "A__ci0")).toBe(true);
        expect(hasEdge(g, "A__ci0", "B")).toBe(true);
    });

    it("records a choice's set as a single object and as an array", () => {
        const script: Script = {
            A: {
                choices: [
                    {
                        name: "one",
                        text: "a",
                        set: {
                            name: "f",
                            type: "set",
                            value: true
                        }
                    },
                    {
                        name: "two",
                        text: "b",
                        set: [{
                            name: "g",
                            type: "set",
                            value: 1
                        }, {
                            name: "h",
                            type: "set",
                            value: "x"
                        }]
                    },
                ]
            },
        };
        const g = buildGraph("s", script);
        expect(node(g, "A__ci0")!.sets).toEqual([{
            name: "f",
            type: "set",
            value: true
        }]);
        expect(node(g, "A__ci1")!.sets).toHaveLength(2);
    });

    it("single-variable eq fork → one conditionItem naming the flag, bare-value edge labels", () => {
        const script: Script = {
            A: {
                text: "x",
                next: [
                    {
                        name: "flag",
                        type: "eq",
                        value: true,
                        node: "B"
                    },
                    {
                        name: "flag",
                        type: "eq",
                        value: false,
                        node: "C"
                    },
                ]
            },
            B: {text: "b"},
            C: {text: "c"},
        };
        const g = buildGraph("s", script);
        expect(node(g, "A__cond")).toMatchObject({
            type: "conditionItem",
            condition: "flag"
        });
        expect(hasEdge(g, "A", "A__cond")).toBe(true);
        expect(edgeLabels(g, "A__cond")).toEqual(expect.arrayContaining(["true", "false"]));
    });

    it("single-variable non-eq fork keeps the operator in the label", () => {
        const script: Script = {
            A: {
                text: "x",
                next: [
                    {
                        name: "score",
                        type: "gte",
                        value: 10,
                        node: "B"
                    },
                    {
                        name: "score",
                        type: "lt",
                        value: 10,
                        node: "C"
                    },
                ]
            },
            B: {text: "b"},
            C: {text: "c"},
        };
        const g = buildGraph("s", script);
        expect(edgeLabels(g, "A__cond")).toEqual(expect.arrayContaining(["≥ 10", "< 10"]));
    });

    it("mixed-variable fork → one conditionItem per branch labelled 'name op value'", () => {
        const script: Script = {
            A: {
                text: "x",
                next: [
                    {
                        name: "x",
                        type: "eq",
                        value: 1,
                        node: "B"
                    },
                    {
                        name: "y",
                        type: "gt",
                        value: 2,
                        node: "C"
                    },
                ]
            },
            B: {text: "b"},
            C: {text: "c"},
        };
        const g = buildGraph("s", script);
        expect(node(g, "A__cond0")).toMatchObject({
            type: "conditionItem",
            condition: "x = 1"
        });
        expect(node(g, "A__cond1")).toMatchObject({
            type: "conditionItem",
            condition: "y > 2"
        });
        expect(hasEdge(g, "A__cond0", "B")).toBe(true);
        expect(hasEdge(g, "A__cond1", "C")).toBe(true);
    });

    it("falls back to the raw operator name in labels for an unknown op", () => {
        const bad = "bad" as unknown as GetCondition["type"];
        // single-variable → value label via valueLabel's fallback
        const single = buildGraph("s", {
            A: {
                text: "x",
                next: [{
                    name: "x",
                    type: bad,
                    value: 1,
                    node: "B"
                }, {
                    name: "x",
                    type: bad,
                    value: 2,
                    node: "C"
                }]
            },
            B: {text: "b"},
            C: {text: "c"},
        });
        expect(edgeLabels(single, "A__cond")).toEqual(expect.arrayContaining(["bad 1", "bad 2"]));
        // mixed-variable → condition label via condLabel's fallback
        const mixed = buildGraph("s", {
            A: {
                text: "x",
                next: [{
                    name: "x",
                    type: bad,
                    value: 1,
                    node: "B"
                }, {
                    name: "y",
                    type: bad,
                    value: 2,
                    node: "C"
                }]
            },
            B: {text: "b"},
            C: {text: "c"},
        });
        expect(node(mixed, "A__cond0")).toMatchObject({condition: "x bad 1"});
    });

    it("a conditional next on a choice branch also forks", () => {
        const script: Script = {
            A: {
                choices: [
                    {
                        name: "c",
                        text: "t",
                        next: [
                            {
                                name: "f",
                                type: "eq",
                                value: true,
                                node: "B"
                            },
                            {
                                name: "f",
                                type: "eq",
                                value: false,
                                node: "C"
                            },
                        ]
                    },
                ]
            },
            B: {text: "b"},
            C: {text: "c"},
        };
        const g = buildGraph("s", script);
        expect(node(g, "A__ci0__cond")).toBeDefined();
        expect(hasEdge(g, "A__ci0", "A__ci0__cond")).toBe(true);
    });
});
