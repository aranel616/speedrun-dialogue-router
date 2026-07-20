// Minimal node/edge shapes for layout (no dependency on a graph-rendering lib).
export interface LayoutNode {
    id: string;
    type: string;
    position: {x: number; y: number};
    style: {width: number};
    data: Record<string, unknown>;
}

export interface LayoutEdge {
    id: string;
    source: string;
    target: string;
}

const NODE_WIDTH = 420;
const H_GAP = 80;
const V_GAP_STRAIGHT = 40; // gap below a linear rank
const V_GAP_BRANCH = 80;   // gap below a rank that fans out to multiple nodes
const FALLBACK_HEIGHT = 88;

export function applyDagreLayout(nodes: LayoutNode[], edges: LayoutEdge[], nodeHeights: Map<string, number>): LayoutNode[] {
    if (nodes.length === 0) {return nodes;}

    const nodeIds = new Set(nodes.map((n) => n.id));

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

    const roots = nodes.filter((n) => parentsOf.get(n.id)!.length === 0);
    const starts = roots.length > 0 ? roots : [nodes[0]!];

    // Iterative DFS to find back-edges (edges to ancestors in the current DFS path).
    // Removing only back-edges breaks cycles while leaving all forward/cross edges intact,
    // so the subsequent Bellman-Ford BFS can assign correct max-ranks to merge points.
    const dfsVisited = new Set<string>();
    const dfsStack = new Set<string>(); // current DFS path (ancestors)
    const backEdges = new Set<string>(); // "source→target" pairs to skip during ranking

    for (const start of starts) {
        /* v8 ignore next -- defensive: roots have no parents, so a start is never already visited */
        if (dfsVisited.has(start.id)) {continue;}
        const stack: [string, number][] = [[start.id, 0]];
        dfsVisited.add(start.id);
        dfsStack.add(start.id);
        while (stack.length > 0) {
            const frame = stack[stack.length - 1]!;
            const [id, ci] = frame;
            const children = childrenOf.get(id)!;
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

    // Bellman-Ford-style BFS: re-enqueue a node whenever its rank increases.
    // Terminates because back-edges are excluded, so the graph is now a DAG
    // and every node's rank is bounded by the longest non-cyclic path to it.
    const rank = new Map<string, number>();
    const queue: string[] = starts.map((n) => n.id);
    for (const n of starts) {rank.set(n.id, 0);}

    let head = 0;
    while (head < queue.length) {
        const id = queue[head++]!;
        const r = rank.get(id)!;
        for (const child of childrenOf.get(id)!) {
            if (backEdges.has(`${id}→${child}`)) {continue;}
            const newRank = r + 1;
            if (!rank.has(child) || rank.get(child)! < newRank) {
                rank.set(child, newRank);
                queue.push(child);
            }
        }
    }

    // Any nodes unreachable from roots get placed at the bottom
    const maxRank = Math.max(0, ...rank.values());
    for (const n of nodes) {
        if (!rank.has(n.id)) {rank.set(n.id, maxRank + 1);}
    }

    // Group nodes by rank
    const byRank = new Map<number, string[]>();
    for (const [id, r] of rank) {
        if (!byRank.has(r)) {byRank.set(r, []);}
    byRank.get(r)!.push(id);
    }

    // Compute cumulative y-positions: each rank's y is the sum of all prior ranks'
    // max-heights + gaps, so variable-height nodes never overlap the row below.
    const sortedRanks = [...byRank.keys()].sort((a, b) => a - b);
    let cumY = 0;
    const rankY = new Map<number, number>();
    for (let i = 0; i < sortedRanks.length; i++) {
        const r = sortedRanks[i]!;
        rankY.set(r, cumY);
        const maxH = Math.max(...byRank.get(r)!.map((id) => nodeHeights.get(id) ?? FALLBACK_HEIGHT));
        // Wider gap across a boundary that fans out (a node here has >1 child) or fans
        // in (a node in the next rank has >1 parent), to give diverging/merging edges
        // room; tight gap for straight linear chains.
        const fanOut = byRank.get(r)!.some((id) => childrenOf.get(id)!.length > 1);
        const nextRank = sortedRanks[i + 1];
        const fanIn = nextRank !== undefined &&
      byRank.get(nextRank)!.some((id) => parentsOf.get(id)!.length > 1);
        cumY += maxH + (fanOut || fanIn ? V_GAP_BRANCH : V_GAP_STRAIGHT);
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

    const result = nodes.map((n) => ({
        ...n,
        position: pos.get(n.id)!
    }));
    return result;
}
