// View/response types shared by the graph package and the web client. Keeping
// them in one package prevents the two from drifting. (There is no server;
// everything runs synchronously in the browser.)

export interface ScriptMeta {
  id: string;
  game: string;
  episode: string;
  nodeCount: number;
}

export interface ScriptListResponse {
  scripts: ScriptMeta[];
}

export interface GraphNode {
  id: string;
  type: "choice" | "linear" | "choiceItem" | "conditionItem";
  text?: string | string[];
  isTerminal: boolean;
  // choiceItem-only fields
  choiceName?: string;
  sets?: Array<{ name: string; type: "set"; value: boolean | number | string }>;
  // conditionItem-only field: human-readable branch condition (e.g. "took_photo_of_kate = true")
  condition?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  edgeType: "choice" | "conditional" | "linear";
}

export interface GraphResponse {
  scriptId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Which unit routing minimizes: raw character count, or an estimated spoken-
// syllable count (a closer proxy for how long a line takes to say). Mirrors
// @sdr/engine's Metric type — duplicated rather than imported so this package
// stays dependency-free, matching its existing style of restating value shapes.
export type Metric = "chars" | "syllables";

export interface TraverseRequest {
  scriptId: string;
  startNode?: string;
  initialContext?: Record<string, boolean | number | string>;
  metric?: Metric;
}

export interface TraverseResponse {
  // Which metric drove the routing decision (the shortest path may differ per metric).
  metric: Metric;
  // Totals for the chosen path under both metrics, so the UI can always show both.
  counts: { chars: number; syllables: number };
  path: string[];
  context: Record<string, boolean | number | string>;
  visitedNodeIds: string[];
  cumulativeCounts: { chars: Record<string, number>; syllables: Record<string, number> };
}
