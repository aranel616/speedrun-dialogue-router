import {calculateDialogueSyllables} from "../calculateDialogueSyllables";

describe("calculateDialogueSyllables", () => {
    it("returns 0 for an empty string", () => {
        expect(calculateDialogueSyllables("")).toBe(0);
    });

    it("returns 0 for a string with no letters", () => {
        expect(calculateDialogueSyllables("...")).toBe(0);
    });

    it("counts a single-syllable word as 1", () => {
        expect(calculateDialogueSyllables("cat")).toBe(1);
    });

    it("counts a short word (<=3 letters) as 1 regardless of vowels", () => {
        expect(calculateDialogueSyllables("I")).toBe(1);
    });

    it("counts a multi-vowel-group word by its vowel groups", () => {
        expect(calculateDialogueSyllables("settings")).toBe(2);
    });

    it("counts a long word with no vowel-like letters as 1 syllable", () => {
        expect(calculateDialogueSyllables("grrrl")).toBe(1);
    });

    it("drops a trailing silent e", () => {
        expect(calculateDialogueSyllables("bake")).toBe(1);
    });

    it("keeps the vowel in a trailing -le", () => {
        expect(calculateDialogueSyllables("settle")).toBe(2);
    });

    it("sums syllables across multiple words in one string", () => {
        expect(calculateDialogueSyllables("hello world")).toBe(3);
    });

    it("ignores punctuation between words", () => {
        expect(calculateDialogueSyllables("\"REPORT NATHAN\"")).toBeGreaterThan(0);
    });

    it("sums across an array of lines", () => {
        expect(calculateDialogueSyllables(["hello", "world"])).toBe(3);
    });

    it("returns 0 for an array of empty strings", () => {
        expect(calculateDialogueSyllables(["", ""])).toBe(0);
    });
});
