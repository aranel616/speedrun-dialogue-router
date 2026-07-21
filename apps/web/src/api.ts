// Data layer. Everything runs in the browser — the routing engine and graph
// builder are pure and the scripts are bundled — so these are plain synchronous
// calls into the packages.
import type {GraphResponse, ScriptListResponse, TraverseRequest, TraverseResponse} from "@sdr/shared";
import {SCRIPTS} from "@sdr/scripts";
import {buildGraph, runTraverse} from "@sdr/graph";

export function listScripts(): ScriptListResponse {
    return {
        scripts: SCRIPTS.map(({id, game, episode, script}) => ({
            id,
            game,
            episode,
            nodeCount: Object.keys(script).length,
        })),
    };
}

export function getGraph(game: string, episode: string): GraphResponse {
    const id = `${game}/${episode}`;
    const entry = SCRIPTS.find((s) => s.id === id);
    if (!entry) {throw new Error(`Script not found: ${id}`);}
    return buildGraph(id, entry.script);
}

export function getShortestPath(request: TraverseRequest): TraverseResponse {
    const entry = SCRIPTS.find((s) => s.id === request.scriptId);
    if (!entry) {throw new Error(`Script not found: ${request.scriptId}`);}
    return runTraverse(entry.script, request.startNode ?? "start", request.initialContext ?? {}, request.metric);
}
