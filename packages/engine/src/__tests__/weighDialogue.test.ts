import {weighDialogue} from "../weighDialogue";

describe("weighDialogue", () => {
    it("uses character count for the chars metric", () => {
        expect(weighDialogue("hello", "chars")).toBe(5);
    });

    it("uses syllable count for the syllables metric", () => {
        expect(weighDialogue("settings", "syllables")).toBe(2);
    });

    it("sums across an array of lines for each metric", () => {
        expect(weighDialogue(["ab", "cd"], "chars")).toBe(4);
        expect(weighDialogue(["hello", "world"], "syllables")).toBe(3);
    });
});
