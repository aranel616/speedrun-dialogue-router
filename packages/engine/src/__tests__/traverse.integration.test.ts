import type {Script} from "../types";
import {traverse} from "../traverse";
import * as calcMod from "../calculateDialogueLength";

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe("traverse — integration", () => {
    it("diamond with shared suffix: shorter initial choice wins", () => {
        // alpha(2) → middle(1) → end(2) = 5
        // beta(10) → middle(1) → end(2) = 13
        const script: Script = {
            start:  {
                choices: [{
                    name: "alpha",
                    text: "ab",
                    next: "middle"
                }, {
                    name: "beta",
                    text: "abcdefghij",
                    next: "middle"
                }]
            },
            middle: {
                text: "x",
                next: "end"
            },
            end:    {text: "zz"},
        };
        expect(traverse(script, "start", 0, {})).toEqual([5, ["alpha", "middle", "end"], {}]);
    });

    it("context-dependent routing: set action forks context, conditional linear next routes to different terminals", () => {
        // report(14) → reaction(14) → good_end → ok(2) = 30
        // hide(11)   → reaction(14) → bad_end(8)       = 33
        const script: Script = {
            start: {
                choices: [
                    {
                        name: "report",
                        text: "Tell the truth",
                        set: {
                            name: "told_truth",
                            type: "set",
                            value: true
                        },
                        next: "reaction"
                    },
                    {
                        name: "hide",
                        text: "Say nothing",
                        set: {
                            name: "told_truth",
                            type: "set",
                            value: false
                        },
                        next: "reaction"
                    },
                ],
            },
            reaction: {
                text: "You responded.",
                next: [
                    {
                        name: "told_truth",
                        type: "eq",
                        value: true,
                        node: "good_end"
                    },
                    {
                        name: "told_truth",
                        type: "eq",
                        value: false,
                        node: "bad_end"
                    },
                ],
            },
            good_end: {
                choices: [{
                    name: "ok",
                    text: "OK"
                }, {
                    name: "great",
                    text: "Great!"
                }]
            },
            bad_end:  {text: "You lied"},
        };
        expect(traverse(script, "start", 0, {})).toEqual([30, ["report", "reaction", "ok"], {told_truth: true}]);
    });

    it("cache re-use across branches: spy confirms fork choices not re-evaluated on cache hit", () => {
        const spy = jest.spyOn(calcMod, "calculateDialogueLength");

        // heavy(10) → fork → fast(5)/slow(10) → end(1)
        // light(2)  → fork (cache hit)         → end(1)
        // heavy: 10+5+1=16, light: 2+marginal(6)=8 → light wins
        const script: Script = {
            start: {
                choices: [{
                    name: "heavy",
                    text: "abcdefghij",
                    next: "fork"
                }, {
                    name: "light",
                    text: "ab",
                    next: "fork"
                }]
            },
            fork:  {
                choices: [{
                    name: "fast",
                    text: "hello",
                    next: "end"
                }, {
                    name: "slow",
                    text: "helloworld",
                    next: "end"
                }]
            },
            end:   {text: "!"},
        };

        const result = traverse(script, "start", 0, {});
        expect(result).toEqual([8, ["light", "fast", "end"], {}]);
        // heavy(1) + fork.fast(1) + end via fast(1) + fork.slow(1) + end via slow(1) + light(1) = 6 calls
        // linear nodes are not cached, so end is called twice within fork's evaluation
        // fork's choices are NOT re-evaluated on the cache hit for light
        expect(spy).toHaveBeenCalledTimes(6);
        spy.mockRestore();
    });

    it("array dialogue text in a linear chain is summed correctly", () => {
        // A: 'Hello'(5) + 'World!'(6) = 11, B: 'Bye'(3) + '!'(1) = 4 → total 15
        const script: Script = {
            A: {
                text: ["Hello", "World!"],
                next: "B"
            },
            B: {text: ["Bye", "!"]},
        };
        expect(traverse(script, "A", 0, {})).toEqual([15, ["A", "B"], {}]);
    });

    it("pre-populated context drives conditional routing without any set actions", () => {
        const script: Script = {
            start: {
                text: "x",
                next: [
                    {
                        name: "score",
                        type: "gte",
                        value: 10,
                        node: "win"
                    },
                    {
                        name: "score",
                        type: "lt",
                        value: 10,
                        node: "lose"
                    },
                ],
            },
            win:  {text: "ab"},
            lose: {text: "abcdef"},
        };

        expect(traverse(script, "start", 0, {score: 10})).toEqual([3, ["start", "win"],  {score: 10}]);
        // Different context → different cache key ({"score":5} vs {"score":10}), so
        // the second call recomputes and routes to the other branch.
        expect(traverse(script, "start", 0, {score: 5})).toEqual([7, ["start", "lose"], {score: 5}]);
    });
});
