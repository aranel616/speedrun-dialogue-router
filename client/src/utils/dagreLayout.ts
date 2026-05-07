import type { Node, Edge } from "@xyflow/react";

const NODE_WIDTH = 420;
const H_GAP = 80;
const V_GAP = 80;
const FALLBACK_HEIGHT = 88;

export function applyDagreLayout(nodes: Node[], edges: Edge[], nodeHeights: Map<string, number>): Node[] {
  console.log(`[dagreLayout] start — ${nodes.length} nodes, ${edges.length} edges`);
  if (nodes.length === 0) return nodes;

  const nodeIds = new Set(nodes.map(n => n.id));

  const childrenOf = new Map<string, string[]>();
  const parentsOf = new Map<string, string[]>();
  for (const n of nodes) {
    childrenOf.set(n.id, []);
    parentsOf.set(n.id, []);
  }
  for (const e of edges) {
    if (nodeIds.has(e.source) && nodeIds.has(e.target) && e.source !== e.target) {
      childrenOf.get(e.source)!.push(e.target);
      parentsOf.get(e.target)!.push(e.source);
    }
  }

  const roots = nodes.filter(n => parentsOf.get(n.id)!.length === 0);
  const starts = roots.length > 0 ? roots : [nodes[0]!];
  console.log(`[dagreLayout] ${roots.length} root(s), detecting back-edges via DFS`);

  // Iterative DFS to find back-edges (edges to ancestors in the current DFS path).
  // Removing only back-edges breaks cycles while leaving all forward/cross edges intact,
  // so the subsequent Bellman-Ford BFS can assign correct max-ranks to merge points.
  const dfsVisited = new Set<string>();
  const dfsStack = new Set<string>(); // current DFS path (ancestors)
  const backEdges = new Set<string>(); // "source→target" pairs to skip during ranking

  for (const start of starts) {
    if (dfsVisited.has(start.id)) continue;
    const stack: [string, number][] = [[start.id, 0]];
    dfsVisited.add(start.id);
    dfsStack.add(start.id);
    while (stack.length > 0) {
      const frame = stack[stack.length - 1]!;
      const [id, ci] = frame;
      const children = childrenOf.get(id) ?? [];
      if (ci >= children.length) {
        stack.pop();
        dfsStack.delete(id);
        continue;
      }
      frame[1] = ci + 1;
      const child = children[ci]!;
      if (dfsStack.has(child)) {
        backEdges.add(`${id}→${child}`);
      } else if (!dfsVisited.has(child)) {
        dfsVisited.add(child);
        dfsStack.add(child);
        stack.push([child, 0]);
      }
    }
  }
  console.log(`[dagreLayout] found ${backEdges.size} back-edge(s), starting Bellman-Ford BFS`);

  // Bellman-Ford-style BFS: re-enqueue a node whenever its rank increases.
  // Terminates because back-edges are excluded, so the graph is now a DAG
  // and every node's rank is bounded by the longest non-cyclic path to it.
  const rank = new Map<string, number>();
  const queue: string[] = starts.map(n => n.id);
  for (const n of starts) rank.set(n.id, 0);

  let head = 0;
  while (head < queue.length) {
    const id = queue[head++]!;
    const r = rank.get(id)!;
    for (const child of childrenOf.get(id) ?? []) {
      if (backEdges.has(`${id}→${child}`)) continue;
      const newRank = r + 1;
      if (!rank.has(child) || rank.get(child)! < newRank) {
        rank.set(child, newRank);
        queue.push(child);
      }
    }
  }
  console.log(`[dagreLayout] BFS done in ${queue.length} steps`);

  // Any nodes unreachable from roots get placed at the bottom
  const maxRank = Math.max(0, ...rank.values());
  const unreachable = nodes.filter(n => !rank.has(n.id));
  if (unreachable.length > 0) console.log(`[dagreLayout] ${unreachable.length} unreachable node(s) placed at rank ${maxRank + 1}`);
  for (const n of nodes) {
    if (!rank.has(n.id)) rank.set(n.id, maxRank + 1);
  }

  // Group nodes by rank
  const byRank = new Map<number, string[]>();
  for (const [id, r] of rank) {
    if (!byRank.has(r)) byRank.set(r, []);
    byRank.get(r)!.push(id);
  }

  // Compute cumulative y-positions: each rank's y is the sum of all prior ranks'
  // max-heights + gaps, so variable-height nodes never overlap the row below.
  const sortedRanks = [...byRank.keys()].sort((a, b) => a - b);
  let cumY = 0;
  const rankY = new Map<number, number>();
  for (const r of sortedRanks) {
    rankY.set(r, cumY);
    const maxH = Math.max(...byRank.get(r)!.map(id => nodeHeights.get(id) ?? FALLBACK_HEIGHT));
    cumY += maxH + V_GAP;
  }

  // Position: center each rank horizontally
  const pos = new Map<string, { x: number; y: number }>();
  for (const [r, ids] of byRank) {
    const totalW = ids.length * (NODE_WIDTH + H_GAP) - H_GAP;
    const startX = -totalW / 2;
    ids.forEach((id, i) => {
      pos.set(id, {
        x: startX + i * (NODE_WIDTH + H_GAP),
        y: rankY.get(r)!,
      });
    });
  }

  const result = nodes.map(n => ({ ...n, position: pos.get(n.id) ?? { x: 0, y: 0 } }));
  console.log(`[dagreLayout] done — ${byRank.size} rank levels, layout complete`);
  return result;
}
