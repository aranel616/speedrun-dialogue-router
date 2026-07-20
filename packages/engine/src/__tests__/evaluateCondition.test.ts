import {evaluateCondition} from "../evaluateCondition";
import type {GetCondition} from "../types";

const cond = (type: GetCondition["type"], name: string, value: boolean | number | string): GetCondition =>
    ({
        name,
        type,
        value,
        node: "any"
    });

describe("evaluateCondition", () => {
    describe("eq", () => {
        it("returns true when numbers match", () => {
            expect(evaluateCondition(cond("eq", "x", 5), {x: 5})).toBe(true);
        });

        it("returns false when numbers differ", () => {
            expect(evaluateCondition(cond("eq", "x", 5), {x: 4})).toBe(false);
        });

        it("returns true for boolean true match", () => {
            expect(evaluateCondition(cond("eq", "flag", true), {flag: true})).toBe(true);
        });

        it("returns false for boolean mismatch", () => {
            expect(evaluateCondition(cond("eq", "flag", true), {flag: false})).toBe(false);
        });

        it("uses strict equality: 1 is not true", () => {
            expect(evaluateCondition(cond("eq", "flag", true), {flag: 1})).toBe(false);
        });

        it("returns false when key is absent from context", () => {
            expect(evaluateCondition(cond("eq", "missing", 5), {})).toBe(false);
        });
    });

    describe("ne", () => {
        it("returns true when values differ", () => {
            expect(evaluateCondition(cond("ne", "x", 5), {x: 4})).toBe(true);
        });

        it("returns false when values match", () => {
            expect(evaluateCondition(cond("ne", "x", 5), {x: 5})).toBe(false);
        });

        it("returns true when the key is absent (undefined !== value)", () => {
            expect(evaluateCondition(cond("ne", "missing", 5), {})).toBe(true);
        });
    });

    describe("gt", () => {
        it("returns true when value is greater", () => {
            expect(evaluateCondition(cond("gt", "x", 3), {x: 4})).toBe(true);
        });

        it("returns false when value is equal", () => {
            expect(evaluateCondition(cond("gt", "x", 3), {x: 3})).toBe(false);
        });

        it("returns false when value is less", () => {
            expect(evaluateCondition(cond("gt", "x", 3), {x: 2})).toBe(false);
        });
    });

    describe("gte", () => {
        it("returns true when equal", () => {
            expect(evaluateCondition(cond("gte", "x", 3), {x: 3})).toBe(true);
        });

        it("returns true when greater", () => {
            expect(evaluateCondition(cond("gte", "x", 3), {x: 5})).toBe(true);
        });

        it("returns false when less", () => {
            expect(evaluateCondition(cond("gte", "x", 3), {x: 2})).toBe(false);
        });
    });

    describe("lt", () => {
        it("returns true when value is less", () => {
            expect(evaluateCondition(cond("lt", "x", 5), {x: 3})).toBe(true);
        });

        it("returns false when value is equal", () => {
            expect(evaluateCondition(cond("lt", "x", 5), {x: 5})).toBe(false);
        });

        it("returns false when value is greater", () => {
            expect(evaluateCondition(cond("lt", "x", 5), {x: 6})).toBe(false);
        });
    });

    describe("lte", () => {
        it("returns true when equal", () => {
            expect(evaluateCondition(cond("lte", "x", 5), {x: 5})).toBe(true);
        });

        it("returns true when less", () => {
            expect(evaluateCondition(cond("lte", "x", 5), {x: 4})).toBe(true);
        });

        it("returns false when greater", () => {
            expect(evaluateCondition(cond("lte", "x", 5), {x: 6})).toBe(false);
        });
    });

    describe("ordering comparisons are numeric-only", () => {
        it("returns false when the context value is unset (not a number)", () => {
            expect(evaluateCondition(cond("gt", "missing", 3), {})).toBe(false);
        });

        it("returns false when the context value is a boolean, not a number", () => {
            expect(evaluateCondition(cond("gte", "flag", 3), {flag: true})).toBe(false);
        });

        it("returns false when the condition value is a string, not a number", () => {
            expect(evaluateCondition(cond("lt", "x", "high"), {x: 5})).toBe(false);
        });
    });

    describe("unknown type", () => {
        it("returns false for an unrecognized type", () => {
            expect(evaluateCondition(cond("unknown" as unknown as GetCondition["type"], "x", 5), {x: 5})).toBe(false);
        });
    });
});
