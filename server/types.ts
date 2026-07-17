export interface ScriptMeta {
  id: string;
  game: string;
  episode: string;
  nodeCount: number;
}

export interface ScriptListResponse {
  scripts: ScriptMeta[];
}

export interface GraphChoice {
  name: string;
  text: string | string[];
  sets?: Array<{ name: string; type: string; value: boolean | number }>;
}

export interface GraphNode {
  id: string;
  type: "choice" | "linear" | "choiceItem" | "conditionItem";
  text?: string | string[];
  isTerminal: boolean;
  // choiceItem-only fields
  choiceName?: string;
  sets?: Array<{ name: string; type: string; value: boolean | number }>;
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
  initialContext?: Record<string, boolean | number>;
}

export interface TraverseResponse {
  length: number;
  path: string[];
  context: Record<string, boolean | number>;
  visitedNodeIds: string[];
  cumulativeCounts: Record<string, number>;
}
