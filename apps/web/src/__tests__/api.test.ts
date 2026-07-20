import {describe, it, expect} from "vitest";
import {listScripts, getGraph, getShortestPath} from "../api";

describe("listScripts", () => {
    it("returns registry entries as script metadata with node counts", () => {
        const {scripts} = listScripts();
        expect(scripts.length).toBeGreaterThan(0);
        const ep1 = scripts.find((s) => s.id === "lifeisstrange/episode1");
        expect(ep1).toMatchObject({
            game: "lifeisstrange",
            episode: "episode1"
        });
        expect(ep1!.nodeCount).toBeGreaterThan(0);
    });
});

describe("getGraph", () => {
    it("builds the graph for an existing script", () => {
        const g = getGraph("lifeisstrange", "episode1");
        expect(g.scriptId).toBe("lifeisstrange/episode1");
        expect(g.nodes.length).toBeGreaterThan(0);
    });

    it("throws for an unknown script", () => {
        expect(() => getGraph("nope", "ep")).toThrow("Script not found: nope/ep");
    });
});

describe("getShortestPath", () => {
    it("runs a traversal for an existing script (default start/context)", () => {
        const r = getShortestPath({scriptId: "lifeisstrange/episode1"});
        expect(r.length).toBeGreaterThan(0);
        expect(r.path.length).toBeGreaterThan(0);
    });

    it("honours an explicit startNode and initialContext", () => {
        const r = getShortestPath({
            scriptId: "lifeisstrange/episode1",
            startNode: "start",
            initialContext: {}
        });
        expect(r.length).toBeGreaterThan(0);
    });

    it("throws for an unknown script", () => {
        expect(() => getShortestPath({scriptId: "nope/ep"})).toThrow("Script not found: nope/ep");
    });
});
