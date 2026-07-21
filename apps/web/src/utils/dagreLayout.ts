// Minimal node/edge shapes for layout (no dependency on a graph-rendering lib).
// `data` is generic so callers can round-trip their own node payload through the
// layout without casting; it defaults to an opaque record for untyped callers.
export interface LayoutNode<T = Record<string, unknown>> {
    id: string;
    type: string;
    position: {x: number; y: number};
    style: {width: number};
    data: T;
}

export interface LayoutEdge {
    id: string;
    source: string;
    target: string;
}

// Flow direction of the graph. "vertical" = ranks stack top→bottom (siblings
// spread across a row); "horizontal" = ranks advance left→right (siblings stack
// down a column). Chosen by the user in Settings; defaults to vertical.
export type LayoutDirection = "vertical" | "horizontal";

const NODE_WIDTH = 420;
const H_GAP = 80;
const V_GAP_STRAIGHT = 40; // gap below a linear rank
const V_GAP_BRANCH = 80;   // gap below a rank that fans out to multiple nodes
const FALLBACK_HEIGHT = 88;

// Horizontal-mode spacing: gap between columns (ranks) and rows (siblings).
const COL_GAP_STRAIGHT = 100;
const COL_GAP_BRANCH = 180;
const ROW_GAP = 28;

export function applyDagreLayout<T>(nodes: LayoutNode<T>[], edges: LayoutEdge[], nodeHeights: Map<string, number>, direction: LayoutDirection = "vertical"): LayoutNode<T>[] {
    if (nodes.length === 0) {return nodes;}

    const nodeIds = new Set(nodes.map((n) => n.id));

    // Invariant used throughout: childrenOf, parentsOf, rank and byRank are all
    // populated for EVERY node id below, so `map.get(id)!` on a known node id is
    // total (never undefined). That's what the non-null assertions here rely on;
    // `nodes[0]!` is likewise safe given the length>0 guard above.
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

    const sortedRanks = [...byRank.keys()].sort((a, b) => a - b);
    const heightOf = (id: string): number => nodeHeights.get(id) ?? FALLBACK_HEIGHT;
    const widthMap = new Map(nodes.map((n) => [n.id, n.style.width]));
    // Wider gap across a boundary that fans out (a node here has >1 child) or fans
    // in (a node in the next rank has >1 parent), to give diverging/merging edges
    // room; tight gap for straight linear chains.
    const isBranchBoundary = (i: number): boolean => {
        const r = sortedRanks[i]!;
        const fanOut = byRank.get(r)!.some((id) => childrenOf.get(id)!.length > 1);
        const nextRank = sortedRanks[i + 1];
        const fanIn = nextRank !== undefined &&
      byRank.get(nextRank)!.some((id) => parentsOf.get(id)!.length > 1);
        return fanOut || fanIn;
    };

    const pos = new Map<string, { x: number; y: number }>();

    if (direction === "horizontal") {
        // Ranks advance along X (each column's x = prior columns' max-widths +
        // gaps); siblings stack down Y using their real measured heights.
        let cumX = 0;
        const rankX = new Map<number, number>();
        for (let i = 0; i < sortedRanks.length; i++) {
            const r = sortedRanks[i]!;
            rankX.set(r, cumX);
            const maxW = Math.max(...byRank.get(r)!.map((id) => widthMap.get(id)!));
            cumX += maxW + (isBranchBoundary(i) ? COL_GAP_BRANCH : COL_GAP_STRAIGHT);
        }
        for (const [r, ids] of byRank) {
            const totalH = ids.reduce((s, id) => s + heightOf(id), 0) + ROW_GAP * (ids.length - 1);
            let y = -totalH / 2;
            for (const id of ids) {
                pos.set(id, {
                    x: rankX.get(r)!,
                    y
                });
                y += heightOf(id) + ROW_GAP;
            }
        }
    } else {
        // Vertical: each rank's y is the sum of all prior ranks' max-heights +
        // gaps, so variable-height nodes never overlap the row below; siblings
        // spread across a centred row.
        let cumY = 0;
        const rankY = new Map<number, number>();
        for (let i = 0; i < sortedRanks.length; i++) {
            const r = sortedRanks[i]!;
            rankY.set(r, cumY);
            const maxH = Math.max(...byRank.get(r)!.map((id) => heightOf(id)));
            cumY += maxH + (isBranchBoundary(i) ? V_GAP_BRANCH : V_GAP_STRAIGHT);
        }
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
    }

    const result = nodes.map((n) => ({
        ...n,
        position: pos.get(n.id)!
    }));
    return result;
}
