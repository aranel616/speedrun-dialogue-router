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

describe("traverse — base cases", () => {
    it("returns currentLength and empty path when nodeId is empty string", () => {
        const [len, path, ctx] = traverse({}, "", 7, {});
        expect(len).toBe(7);
        expect(path).toEqual([]);
        expect(ctx).toEqual({});
    });

    it("single linear terminal node returns its text length", () => {
        const script: Script = {A: {text: "hello"}};
        expect(traverse(script, "A", 0, {})).toEqual([5, ["A"], {}]);
    });

    it("single linear terminal node with empty text returns 0", () => {
        const script: Script = {A: {text: ""}};
        expect(traverse(script, "A", 0, {})).toEqual([0, ["A"], {}]);
    });

    it("single choice node with two terminals picks the shorter one", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "short",
                    text: "ab"
                }, {
                    name: "long",
                    text: "abcdefghij"
                }]
            }
        };
        expect(traverse(script, "A", 0, {})).toEqual([2, ["short"], {}]);
    });

    it("path elements use choice.name not node ID", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "the choice",
                    text: "abc"
                }]
            }
        };
        const [, path] = traverse(script, "A", 0, {});
        expect(path).toEqual(["the choice"]);
    });

    it("currentLength offset is preserved in the total", () => {
        const script: Script = {A: {text: "ab"}};
        expect(traverse(script, "A", 10, {})).toEqual([12, ["A"], {}]);
    });

    it("tie between two choices: first choice wins (strict < comparison)", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "first",
                    text: "ab"
                }, {
                    name: "second",
                    text: "ab"
                }]
            }
        };
        const [, path] = traverse(script, "A", 0, {});
        expect(path).toEqual(["first"]);
    });
});

describe("traverse — linear chains", () => {
    it("follows a two-node linear chain", () => {
        const script: Script = {
            A: {
                text: "hello",
                next: "B"
            },
            B: {text: "world"}
        };
        expect(traverse(script, "A", 0, {})).toEqual([10, ["A", "B"], {}]);
    });

    it("follows a three-node linear chain", () => {
        const script: Script = {
            A: {
                text: "ab",
                next: "B"
            },
            B: {
                text: "cd",
                next: "C"
            },
            C: {text: "ef"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([6, ["A", "B", "C"], {}]);
    });

    it("sums array text on a linear node correctly", () => {
        const script: Script = {
            A: {
                text: ["abc", "de"],
                next: "B"
            },
            B: {text: "f"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([6, ["A", "B"], {}]);
    });
});

describe("traverse — conditional routing on linear next", () => {
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
            ],
        },
        B: {text: "ab"},
        C: {text: "abcdefgh"},
    };

    it("takes the true branch when flag is true", () => {
        expect(traverse(script, "A", 0, {flag: true})).toEqual([3, ["A", "B"], {flag: true}]);
    });

    it("takes the false branch when flag is false", () => {
        expect(traverse(script, "A", 0, {flag: false})).toEqual([9, ["A", "C"], {flag: false}]);
    });

    it("becomes terminal when no conditions match", () => {
        const s: Script = {
            A: {
                text: "x",
                next: [{
                    name: "flag",
                    type: "eq",
                    value: true,
                    node: "B"
                }]
            },
            B: {text: "ab"},
        };
        expect(traverse(s, "A", 0, {})).toEqual([1, ["A"], {}]);
    });
});

describe("traverse — context mutation", () => {
    it("set action applies to forked context and is returned", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "c",
                    text: "x",
                    set: {
                        name: "flag",
                        type: "set",
                        value: true
                    },
                    next: "B"
                }]
            },
            B: {text: "y"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([2, ["c", "B"], {flag: true}]);
    });

    it("set action does not mutate the original context object", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "c",
                    text: "x",
                    set: {
                        name: "flag",
                        type: "set",
                        value: true
                    },
                    next: "B"
                }]
            },
            B: {text: "y"},
        };
        const original = {flag: false};
        traverse(script, "A", 0, original);
        expect(original).toEqual({flag: false});
    });

    it("applies all type:set entries from an array of set actions", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "c",
                    text: "x",
                    set: [{
                        name: "a",
                        type: "set",
                        value: 1
                    }, {
                        name: "b",
                        type: "set",
                        value: true
                    }],
                    next: "B"
                }]
            },
            B: {text: "y"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([2, ["c", "B"], {
            a: 1,
            b: true
        }]);
    });
});

describe("traverse — shortest-path selection", () => {
    it("selects shorter choice text when both continue to the same node", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "short",
                    text: "ab",
                    next: "C"
                }, {
                    name: "long",
                    text: "abcdefghij",
                    next: "C"
                }]
            },
            C: {text: "x"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([3, ["short", "C"], {}]);
    });

    it("longer initial choice text loses even when it leads to the same continuation", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "c1",
                    text: "x",
                    next: "B"
                }, {
                    name: "c2",
                    text: "ab",
                    next: "D"
                }]
            },
            B: {text: "abcdefghij"},
            D: {text: "a"},
        };
        // c1: 1+10=11, c2: 2+1=3
        expect(traverse(script, "A", 0, {})).toEqual([3, ["c2", "D"], {}]);
    });
});

describe("traverse — cache correctness", () => {
    it("two branches reach same node: second uses cached marginal cost and total is correct", () => {
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
        // heavy: 10+5+1=16, light: 2+6(marginal)=8
        expect(traverse(script, "start", 0, {})).toEqual([8, ["light", "fast", "end"], {}]);
    });

    it("different contexts produce separate cache entries and do not bleed", () => {
        const script: Script = {
            start: {
                choices: [
                    {
                        name: "setOne",
                        text: "a",
                        set: {
                            name: "x",
                            type: "set",
                            value: 1
                        },
                        next: "fork"
                    },
                    {
                        name: "setTwo",
                        text: "a",
                        set: {
                            name: "x",
                            type: "set",
                            value: 2
                        },
                        next: "fork"
                    },
                ],
            },
            fork: {
                choices: [
                    {
                        name: "c1",
                        text: "hi",
                        next: [{
                            name: "x",
                            type: "eq",
                            value: 1,
                            node: "endA"
                        }, {
                            name: "x",
                            type: "eq",
                            value: 2,
                            node: "endB"
                        }],
                    },
                    {
                        name: "c2",
                        text: "byebye",
                        next: [{
                            name: "x",
                            type: "eq",
                            value: 1,
                            node: "endA"
                        }, {
                            name: "x",
                            type: "eq",
                            value: 2,
                            node: "endB"
                        }],
                    },
                ],
            },
            endA: {text: "z"},
            endB: {text: "z"},
        };
        // Both choices at start cost 1 char + fork('hi'=2 + endX=1 = 3) = total 4 each
        // setOne path: 1 + 2 + 1 = 4, context {x:1}
        // setTwo path: 1 + 2 + 1 = 4, context {x:2} — tie, first wins
        const [len, path, ctx] = traverse(script, "start", 0, {});
        expect(len).toBe(4);
        expect(path).toEqual(["setOne", "c1", "endA"]);
        expect(ctx).toEqual({x: 1});
    });

    it("cache hit reduces calculateDialogueLength call count", () => {
        const spy = jest.spyOn(calcMod, "calculateDialogueLength");
        // Fresh script object → its own (empty) cache in the WeakMap.
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

        traverse(script, "start", 0, {});

        // heavy(1) + fork.fast(1) + end via fast(1) + fork.slow(1) + end via slow(1) + light(1) = 6
        // linear nodes are not cached, so end is called twice within fork's evaluation
        // fork's choices are NOT re-evaluated on the cache hit for 'light'
        expect(spy).toHaveBeenCalledTimes(6);
        spy.mockRestore();
    });
});

describe("traverse — set action on terminal choice", () => {
    it("applies set action even when choice has no next", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "c",
                    text: "x",
                    set: {
                        name: "flag",
                        type: "set",
                        value: true
                    }
                }]
            },
        };
        expect(traverse(script, "A", 0, {})).toEqual([1, ["c"], {flag: true}]);
    });

    it("picks shortest terminal choice and applies its set action", () => {
        const script: Script = {
            A: {
                choices: [
                    {
                        name: "long",
                        text: "abcde",
                        set: {
                            name: "result",
                            type: "set",
                            value: "long"
                        }
                    },
                    {
                        name: "short",
                        text: "ab",
                        set: {
                            name: "result",
                            type: "set",
                            value: "short"
                        }
                    },
                ],
            },
        };
        const [len, path, ctx] = traverse(script, "A", 0, {});
        expect(len).toBe(2);
        expect(path).toEqual(["short"]);
        expect(ctx).toEqual({result: "short"});
    });
});

describe("traverse — cycle detection", () => {
    it("returns Infinity for a direct self-cycle (A -> A)", () => {
        const [len] = traverse({
            A: {
                text: "x",
                next: "A"
            }
        }, "A", 0, {});
        expect(len).toBe(Infinity);
    });

    it("returns Infinity for a two-step cycle (A -> B -> A)", () => {
        const script: Script = {
            A: {
                text: "x",
                next: "B"
            },
            B: {
                text: "y",
                next: "A"
            }
        };
        const [len] = traverse(script, "A", 0, {});
        expect(len).toBe(Infinity);
    });

    it("rejects a cyclic choice in favour of a non-cyclic one", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "loop",
                    text: "x",
                    next: "A"
                }, {
                    name: "exit",
                    text: "ab",
                    next: "B"
                }]
            },
            B: {text: "c"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([3, ["exit", "B"], {}]);
    });

    it("returns Infinity when a self-cycle is the only option", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "loop",
                    text: "x",
                    next: "A"
                }]
            }
        };
        const [len] = traverse(script, "A", 0, {});
        expect(len).toBe(Infinity);
    });

    it("does not treat a diamond (shared successor) as a cycle", () => {
        const script: Script = {
            A: {
                choices: [{
                    name: "left",
                    text: "x",
                    next: "C"
                }, {
                    name: "right",
                    text: "y",
                    next: "C"
                }]
            },
            C: {text: "z"},
        };
        expect(traverse(script, "A", 0, {})).toEqual([2, ["left", "C"], {}]);
    });
});

describe("traverse — malformed script", () => {
    it("throws a clear error when a node references a non-existent node id", () => {
        const script: Script = {
            A: {
                text: "x",
                next: "GHOST"
            }
        };
        expect(() => traverse(script, "A", 0, {})).toThrow(/Node not found: "GHOST"/);
    });
});
