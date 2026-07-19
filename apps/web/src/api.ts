// Data layer. Everything runs in the browser — the routing engine and graph
// builder are pure, and the scripts are bundled — so these just call the
// packages directly. Kept async so the calling components don't care whether
// the work is local or (someday) remote.
import type {GraphResponse, ScriptListResponse, TraverseRequest, TraverseResponse} from "@sdr/shared";
import type {Context} from "@sdr/engine";
import {SCRIPTS} from "@sdr/scripts";
import {buildGraph, runTraverse} from "@sdr/graph";

export async function fetchScripts(): Promise<ScriptListResponse> {
    return {
        scripts: SCRIPTS.map(({id, game, episode, script}) => ({
            id,
            game,
            episode,
            nodeCount: Object.keys(script).length,
        })),
    };
}

export async function fetchGraph(game: string, episode: string): Promise<GraphResponse> {
    const id = `${game}/${episode}`;
    const entry = SCRIPTS.find((s) => s.id === id);
    if (!entry) {throw new Error(`Script not found: ${id}`);}
    return buildGraph(id, entry.script);
}

export async function postTraverse(body: TraverseRequest): Promise<TraverseResponse> {
    const entry = SCRIPTS.find((s) => s.id === body.scriptId);
    if (!entry) {throw new Error(`Script not found: ${body.scriptId}`);}
    return runTraverse(entry.script, body.startNode ?? "start", (body.initialContext ?? {}) as Context);
}
