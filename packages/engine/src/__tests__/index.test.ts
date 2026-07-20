import * as engine from "../index";

describe("@sdr/engine public API", () => {
    it("re-exports the engine functions from the barrel", () => {
        expect(typeof engine.traverse).toBe("function");
        expect(typeof engine.getNextNode).toBe("function");
        expect(typeof engine.evaluateCondition).toBe("function");
        expect(typeof engine.calculateDialogueLength).toBe("function");
    });

    it("the barrel functions work end to end", () => {
        expect(engine.traverse({A: {text: "hi"}}, "A", 0, {}, 0)).toEqual([2, ["A"], {}]);
    });
});
