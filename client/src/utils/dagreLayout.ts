import type { Node, Edge } from "@xyflow/react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 64;
const H_GAP = 100;
const V_GAP = 80;

export function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
  console.log(`[dagreLayout] start — ${nodes.length} nodes, ${edges.length} edges`);
  if (nodes.length === 0) return nodes;

  const nodeIds = new Set(nodes.map(n => n.id));
  const maxRankAllowed = nodes.length - 1; // cycle guard: rank can't exceed N-1 in any DAG

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

  // BFS from roots (nodes with no parents), assigning ranks
  const rank = new Map<string, number>();
  const roots = nodes.filter(n => parentsOf.get(n.id)!.length === 0);
  const starts = roots.length > 0 ? roots : [nodes[0]!];
  console.log(`[dagreLayout] ${roots.length} root(s), starting BFS`);

  const queue: string[] = starts.map(n => n.id);
  for (const n of starts) rank.set(n.id, 0);

  let head = 0;
  let iterations = 0;
  while (head < queue.length) {
    const id = queue[head++]!;
    const r = rank.get(id)!;
    iterations++;
    if (iterations % 5000 === 0) {
      console.warn(`[dagreLayout] BFS iteration ${iterations}, queue length ${queue.length - head} — possible cycle`);
    }
    for (const child of childrenOf.get(id) ?? []) {
      const newRank = r + 1;
      if (newRank > maxRankAllowed) continue; // cycle guard: prevents infinite loop on cyclic graphs
      // take the maximum rank (ensures nodes appear below all their parents)
      if (!rank.has(child) || rank.get(child)! < newRank) {
        rank.set(child, newRank);
        queue.push(child);
      }
    }
  }
  console.log(`[dagreLayout] BFS done in ${iterations} iterations`);

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

  // Position: center each rank horizontally
  const pos = new Map<string, { x: number; y: number }>();
  for (const [r, ids] of byRank) {
    const totalW = ids.length * (NODE_WIDTH + H_GAP) - H_GAP;
    const startX = -totalW / 2;
    ids.forEach((id, i) => {
      pos.set(id, {
        x: startX + i * (NODE_WIDTH + H_GAP),
        y: r * (NODE_HEIGHT + V_GAP),
      });
    });
  }

  const result = nodes.map(n => ({ ...n, position: pos.get(n.id) ?? { x: 0, y: 0 } }));
  console.log(`[dagreLayout] done — ${byRank.size} rank levels, layout complete`);
  return result;
}
