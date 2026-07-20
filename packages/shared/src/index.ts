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

export interface TraverseRequest {
  scriptId: string;
  startNode?: string;
  initialContext?: Record<string, boolean | number | string>;
}

export interface TraverseResponse {
  length: number;
  path: string[];
  context: Record<string, boolean | number | string>;
  visitedNodeIds: string[];
  cumulativeCounts: Record<string, number>;
}
