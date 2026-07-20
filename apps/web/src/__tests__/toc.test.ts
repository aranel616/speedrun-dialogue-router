import {describe, it, expect} from "vitest";
import {TOC} from "../toc";

describe("TOC", () => {
    it("defines well-formed outline entries for each script", () => {
        expect(Object.keys(TOC).length).toBeGreaterThan(0);
        for (const entries of Object.values(TOC)) {
            expect(entries.length).toBeGreaterThan(0);
            for (const entry of entries) {
                expect(typeof entry.title).toBe("string");
                expect(typeof entry.nodeId).toBe("string");
                expect(["scene", "decision"]).toContain(entry.kind);
            }
        }
    });
});
