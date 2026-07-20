import {runTraverse} from "../index";
import type {Script} from "@sdr/engine";

describe("runTraverse", () => {
    it("packages length, path, context, visited ids and cumulative counts for a linear chain", () => {
        const script: Script = {start: {text: "ab", next: "end"}, end: {text: "c"}};
        const r = runTraverse(script, "start", {});
        expect(r.length).toBe(3);
        expect(r.path).toEqual(["start", "end"]);
        expect(r.visitedNodeIds).toEqual(["start", "end"]);
        expect(r.cumulativeCounts).toEqual({start: 2, end: 3});
    });

    it("defaults startNode to 'start' and context to {}", () => {
        const r = runTraverse({start: {text: "x"}});
        expect(r.path).toEqual(["start"]);
        expect(r.context).toEqual({});
    });

    it("records the choice + choiceItem visit, applies sets, and counts to the choiceItem", () => {
        const script: Script = {
            start: {choices: [{name: "pick", text: "hi", set: {name: "f", type: "set", value: true}, next: "end"}]},
            end: {text: "!"},
        };
        const r = runTraverse(script, "start", {});
        expect(r.visitedNodeIds).toEqual(expect.arrayContaining(["start", "start__ci0", "end"]));
        expect(r.context).toEqual({f: true});
        expect(r.cumulativeCounts["start__ci0"]).toBe(2); // "hi"
    });

    it("applies an array of set actions on the taken choice", () => {
        const script: Script = {
            start: {choices: [{name: "c", text: "x", set: [{name: "a", type: "set", value: 1}, {name: "b", type: "set", value: true}]}]},
        };
        const r = runTraverse(script, "start", {});
        expect(r.context).toEqual({a: 1, b: true});
    });

    it("ignores non-'set' set actions (add/subtract) when replaying the path", () => {
        const script: Script = {
            start: {choices: [{name: "c", text: "x", set: {name: "n", type: "add", value: 99}}]},
        };
        const r = runTraverse(script, "start", {n: 5});
        expect(r.context).toEqual({n: 5}); // add is parsed but not applied
    });

    it("marks the single-variable condition node on a linear conditional route", () => {
        const script: Script = {
            start: {text: "x", next: [
                {name: "f", type: "eq", value: true, node: "win"},
                {name: "f", type: "eq", value: false, node: "lose"},
            ]},
            win: {text: "w"}, lose: {text: "loser"},
        };
        const r = runTraverse(script, "start", {f: true});
        expect(r.visitedNodeIds).toContain("start__cond");
        expect(r.path).toEqual(["start", "win"]);
    });

    it("marks the indexed condition node on a mixed-variable conditional route from a choice", () => {
        const script: Script = {
            start: {choices: [{name: "c", text: "t", next: [
                {name: "x", type: "eq", value: 1, node: "a"},
                {name: "y", type: "eq", value: 2, node: "b"},
            ]}]},
            a: {text: "a"}, b: {text: "b"},
        };
        const r = runTraverse(script, "start", {x: 1});
        expect(r.visitedNodeIds.some((v) => v.startsWith("start__ci0__cond"))).toBe(true);
        expect(r.path).toEqual(["c", "a"]);
    });

    it("marks the single-variable condition node on a choice's conditional route", () => {
        const script: Script = {
            start: {choices: [{name: "c", text: "t", next: [
                {name: "f", type: "eq", value: true, node: "a"},
                {name: "f", type: "eq", value: false, node: "b"},
            ]}]},
            a: {text: "a"}, b: {text: "b"},
        };
        const r = runTraverse(script, "start", {f: true});
        expect(r.visitedNodeIds).toContain("start__ci0__cond");
    });

    it("marks the indexed condition node on a linear mixed-variable route", () => {
        const script: Script = {
            start: {text: "x", next: [
                {name: "x", type: "eq", value: 1, node: "a"},
                {name: "y", type: "eq", value: 2, node: "b"},
            ]},
            a: {text: "a"}, b: {text: "b"},
        };
        const r = runTraverse(script, "start", {x: 1});
        expect(r.visitedNodeIds).toContain("start__cond0");
    });

    it("stops at a terminal choice (no next)", () => {
        const r = runTraverse({start: {choices: [{name: "end", text: "x"}]}}, "start", {});
        expect(r.path).toEqual(["end"]);
        expect(r.visitedNodeIds).toEqual(["start", "start__ci0"]);
    });

    it("stops when a linear node's conditional next matches nothing (terminal fallback)", () => {
        const script: Script = {
            start: {text: "x", next: [{name: "f", type: "eq", value: true, node: "win"}]},
            win: {text: "w"},
        };
        const r = runTraverse(script, "start", {f: false});
        expect(r.path).toEqual(["start"]);
        expect(r.visitedNodeIds).toEqual(["start"]);
    });

    it("stops when a choice's conditional next matches nothing", () => {
        const script: Script = {
            start: {choices: [{name: "c", text: "x", next: [{name: "f", type: "eq", value: true, node: "win"}]}]},
            win: {text: "w"},
        };
        const r = runTraverse(script, "start", {f: false});
        expect(r.path).toEqual(["c"]);
        expect(r.visitedNodeIds).toEqual(["start", "start__ci0"]);
    });
});
