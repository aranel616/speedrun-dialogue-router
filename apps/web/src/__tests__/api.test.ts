import {describe, it, expect} from "vitest";
import {fetchScripts, fetchGraph, postTraverse} from "../api";

describe("fetchScripts", () => {
    it("returns registry entries as script metadata with node counts", async () => {
        const {scripts} = await fetchScripts();
        expect(scripts.length).toBeGreaterThan(0);
        const ep1 = scripts.find((s) => s.id === "lifeisstrange/episode1");
        expect(ep1).toMatchObject({game: "lifeisstrange", episode: "episode1"});
        expect(ep1!.nodeCount).toBeGreaterThan(0);
    });
});

describe("fetchGraph", () => {
    it("builds the graph for an existing script", async () => {
        const g = await fetchGraph("lifeisstrange", "episode1");
        expect(g.scriptId).toBe("lifeisstrange/episode1");
        expect(g.nodes.length).toBeGreaterThan(0);
    });

    it("rejects for an unknown script", async () => {
        await expect(fetchGraph("nope", "ep")).rejects.toThrow("Script not found: nope/ep");
    });
});

describe("postTraverse", () => {
    it("runs a traversal for an existing script (default start/context)", async () => {
        const r = await postTraverse({scriptId: "lifeisstrange/episode1"});
        expect(r.length).toBeGreaterThan(0);
        expect(r.path.length).toBeGreaterThan(0);
    });

    it("honours an explicit startNode and initialContext", async () => {
        const r = await postTraverse({scriptId: "lifeisstrange/episode1", startNode: "start", initialContext: {}});
        expect(r.length).toBeGreaterThan(0);
    });

    it("rejects for an unknown script", async () => {
        await expect(postTraverse({scriptId: "nope/ep"})).rejects.toThrow("Script not found: nope/ep");
    });
});
