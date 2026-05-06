import type { ScriptListResponse, GraphResponse, TraverseRequest, TraverseResponse } from "./types";

export async function fetchScripts(): Promise<ScriptListResponse> {
  const res = await fetch("/api/scripts");
  if (!res.ok) throw new Error("Failed to fetch scripts");
  return res.json() as Promise<ScriptListResponse>;
}

export async function fetchGraph(game: string, episode: string): Promise<GraphResponse> {
  const res = await fetch(`/api/graph/${game}/${episode}`);
  if (!res.ok) throw new Error(`Failed to fetch graph for ${game}/${episode}`);
  return res.json() as Promise<GraphResponse>;
}

export async function postTraverse(body: TraverseRequest): Promise<TraverseResponse> {
  const res = await fetch("/api/traverse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Traversal failed");
  return res.json() as Promise<TraverseResponse>;
}
