import {useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef, memo} from "react";
import type {GraphNode, GraphEdge} from "@sdr/shared";
import {applyDagreLayout, type LayoutDirection, type LayoutNode, type LayoutEdge} from "../utils/dagreLayout";
import {TOC} from "../toc";

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 3;
const PAN_STEP = 140; // px the pan buttons move the view per click

const zoomBtnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "1px solid #475569",
    background: "#1e293b",
    color: "#e2e8f0",
    fontSize: 20,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
};

// Fixed render width per node type (matches the card CSS). Height is measured
// from the real DOM rather than estimated — see the hidden measurement layer.
function nodeWidth(type: GraphNode["type"]): number {
    return type === "choiceItem" ? 330 : type === "conditionItem" ? 260 : 420;
}

const NOOP = (): void => {};

interface Viewport { x: number; y: number; zoom: number }
interface PosNode { id: string; x: number; y: number; w: number; h: number; node: GraphNode }

function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, v)); }

function edgePath(sx: number, sy: number, tx: number, ty: number, horizontal: boolean): string {
    if (horizontal) {
        // S-curve with horizontal tangents (flow left→right).
        const mx = (sx + tx) / 2;
        return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
    }
    // S-curve with vertical tangents (flow top→bottom).
    const my = (sy + ty) / 2;
    return `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`;
}

// Offsets that place `node`'s centre at the middle of the container, per axis.
function centerX(el: HTMLDivElement, node: PosNode, zoom: number): number {
    return el.offsetWidth / 2 - (node.x + node.w / 2) * zoom;
}
function centerY(el: HTMLDivElement, node: PosNode, zoom: number): number {
    return el.offsetHeight / 2 - (node.y + node.h / 2) * zoom;
}

// The initial/reset framing: `node` centred horizontally, its vertical middle a
// third of the way down the container.
function framedView(el: HTMLDivElement, node: PosNode, zoom: number): Viewport {
    return {
        x: centerX(el, node, zoom),
        y: el.offsetHeight / 3 - (node.y + node.h / 2) * zoom,
        zoom,
    };
}

function cleanLabel(id: string): string {
    return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Node cards are div-based (not <button>) so their rich multi-line content lays
// out freely, but they must still be reachable and operable by keyboard/AT — so
// give them button semantics, an accessible name, Enter/Space activation, and
// aria state for selected (pressed) and on-the-shortest-path (current).
function cardProps(onClick: ()=> void, state: {label: string; selected: boolean; onPath: boolean}): {
    role: "button";
    tabIndex: number;
    "aria-label": string;
    "aria-pressed": boolean;
    "aria-current": "step" | undefined;
    onClick: ()=> void;
    onKeyDown: (e: React.KeyboardEvent)=> void;
} {
    return {
        role: "button",
        tabIndex: 0,
        "aria-label": state.label,
        "aria-pressed": state.selected,
        "aria-current": state.onPath ? "step" : undefined,
        onClick,
        onKeyDown: (e): void => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        },
    };
}

function NodeCard({node, highlighted, selected, onClick, cumulative}: {
  node: GraphNode; highlighted: boolean; selected: boolean; onClick: ()=> void; cumulative?: number;
}): JSX.Element {
    if (node.type === "choice") {
        return (
            <div
                {...cardProps(onClick, {
                    label: `Branch ${cleanLabel(node.id)}`,
                    selected,
                    onPath: highlighted
                })}
                className={`dialogue-node choice-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}`}
                >
                <div className="choice-node-header">
                    <span className="node-id">{cleanLabel(node.id)}</span>
                    <span className="node-branch-badge">branch</span>
                </div>
            </div>
        );
    }
    if (node.type === "conditionItem") {
        return (
            <div
                {...cardProps(onClick, {
                    label: `Condition ${node.condition ?? node.id}`,
                    selected,
                    onPath: highlighted
                })}
                className={`condition-item-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}`}
                >
                <span className="condition-if">IF</span>
                <span className="condition-label">{node.condition}</span>
            </div>
        );
    }
    if (node.type === "choiceItem") {
        const lines = Array.isArray(node.text) ? node.text : node.text ? [node.text] : [];
        const charCount = lines.reduce((n, l) => n + l.length, 0);
        return (
            <div
                {...cardProps(onClick, {
                    label: `Choice ${node.choiceName ?? node.id}`,
                    selected,
                    onPath: highlighted
                })}
                className={`choice-item-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}${node.isTerminal ? " terminal" : ""}`}
                >
                <div className="ci-name">{node.choiceName}</div>
                {lines.map((line, i) => <div key={i} className="node-dialogue-line">{line}</div>)}
                {node.sets && node.sets.length > 0 && (
                <div className="ci-sets">
                    {node.sets.map((s, i) => <span key={i} className="set-badge">{s.name}={String(s.value)}</span>)}
                </div>
                )}
                <div className="node-stats-row">
                    <span className="node-char-count">{charCount.toLocaleString()} chars</span>
                    {cumulative !== undefined && <span className="node-cumulative-count">{cumulative.toLocaleString()} total</span>}
                </div>
            </div>
        );
    }
    // linear — show every dialogue line in full, no truncation
    const lines = Array.isArray(node.text) ? node.text : node.text ? [node.text] : [];
    const charCount = lines.reduce((n, l) => n + l.length, 0);
    return (
        <div
            {...cardProps(onClick, {
                label: `Dialogue ${node.id}`,
                selected,
                onPath: highlighted
            })}
            className={`dialogue-node linear-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}${node.isTerminal ? " terminal" : ""}`}
            >
            {lines.map((line, i) => <div key={i} className="node-dialogue-line">{line}</div>)}
            <div className="node-stats-row">
                <span className="node-id-tag">{node.id}</span>
                <span className="node-char-count">{charCount.toLocaleString()} chars</span>
                {cumulative !== undefined && <span className="node-cumulative-count">{cumulative.toLocaleString()} total</span>}
            </div>
        </div>
    );
}

const MemoCard = memo(NodeCard);

// Minimap runs long along the graph's flow axis: tall & narrow when vertical,
// wide & short when horizontal (see MM_W/MM_H inside Minimap).
const MM_PAD = 8;
const MM_LONG = 720;
const MM_SHORT = 140;

function Minimap({posNodes, visitedNodeIds, viewport, containerW, containerH, horizontal, onNavigate}: {
  posNodes: PosNode[];
  visitedNodeIds: Set<string>;
  viewport: Viewport;
  containerW: number;
  containerH: number;
  horizontal: boolean;
  onNavigate: (v: Viewport)=> void;
}): JSX.Element | null {
    const dragging = useRef(false);
    if (posNodes.length === 0) {return null;}

    const MM_W = horizontal ? MM_LONG : MM_SHORT;
    const MM_H = horizontal ? MM_SHORT : MM_LONG;

    const gx0 = Math.min(...posNodes.map((n) => n.x));
    const gy0 = Math.min(...posNodes.map((n) => n.y));
    const gx1 = Math.max(...posNodes.map((n) => n.x + n.w));
    const gy1 = Math.max(...posNodes.map((n) => n.y + n.h));
    const gW = gx1 - gx0;
    const gH = gy1 - gy0;

    const innerW = MM_W - MM_PAD * 2;
    const innerH = MM_H - MM_PAD * 2;

    // Scale width and height independently so the ENTIRE graph fills the panel:
    // full width, full height, nothing scrolls. The graph shape is schematically
    // stretched, which is fine for an overview.
    const scaleX = innerW / gW;
    const scaleY = innerH / gH;

    function toMM(gx: number, gy: number): {mx: number; my: number} {
        return {
            mx: MM_PAD + (gx - gx0) * scaleX,
            my: MM_PAD + (gy - gy0) * scaleY
        };
    }

    const {x: vx, y: vy, zoom: vz} = viewport;

    // Viewport indicator: a band spanning the cross-axis that slides along the
    // flow axis — a vertical band moving horizontally when the graph flows
    // left→right, a horizontal band moving vertically when it flows top→down.
    const vpMX = horizontal ? MM_PAD + (-vx / vz - gx0) * scaleX : MM_PAD;
    const vpMY = horizontal ? MM_PAD : MM_PAD + (-vy / vz - gy0) * scaleY;
    const vpMW = horizontal ? (containerW / vz) * scaleX : innerW;
    const vpMH = horizontal ? innerH : (containerH / vz) * scaleY;

    // Navigation follows the flow axis; the cross axis stays centred.
    function navigate(e: React.MouseEvent<SVGSVGElement>): void {
        const rect = e.currentTarget.getBoundingClientRect();
        if (horizontal) {
            const gx = (e.clientX - rect.left - MM_PAD) / scaleX + gx0;
            const gyc = gy0 + gH / 2;
            onNavigate({
                x: containerW / 2 - gx * vz,
                y: containerH / 2 - gyc * vz,
                zoom: vz
            });
        } else {
            const gy = (e.clientY - rect.top - MM_PAD) / scaleY + gy0;
            const gxc = gx0 + gW / 2;
            onNavigate({
                x: containerW / 2 - gxc * vz,
                y: containerH / 2 - gy * vz,
                zoom: vz
            });
        }
    }

    function nodeColor(n: PosNode): string {
        if (visitedNodeIds.has(n.id)) {return "#22c55e";}
        if (n.node.type === "choice") {return "#6366f1";}
        if (n.node.type === "choiceItem") {return "#818cf8";}
        return "#0ea5e9";
    }

    return (
        <svg
            className="minimap"
            // Decorative overview + mouse-only navigation aid; keyboard/AT users
            // navigate via the pan controls and table of contents instead.
            aria-hidden="true"
            width={MM_W}
            height={MM_H}
            onMouseDown={(e) => { dragging.current = true; navigate(e); e.stopPropagation(); }}
            onMouseMove={(e) => { if (dragging.current) {navigate(e);} }}
            onMouseUp={() => { dragging.current = false; }}
            onMouseLeave={() => { dragging.current = false; }}
            >
            {posNodes.map((n) => {
                const {mx, my} = toMM(n.x, n.y);
                return (
                    <rect key={n.id} x={mx} y={my}
                        width={Math.max(3, n.w * scaleX)} height={Math.max(2, n.h * scaleY)}
                        fill={nodeColor(n)} opacity={0.75} rx={1} />
                );
            })}
            <rect x={vpMX} y={vpMY}
                width={horizontal ? Math.max(6, vpMW) : vpMW}
                height={horizontal ? vpMH : Math.max(6, vpMH)}
                fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} rx={2} />
        </svg>
    );
}

interface Props {
  scriptId?: string;
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  visitedNodeIds: Set<string>;
  selectedNodeId: string | null;
  onNodeClick: (id: string)=> void;
  cumulativeCounts: Record<string, number>;
  layoutDirection?: LayoutDirection;
}

export function GraphCanvas({scriptId, graphNodes, graphEdges, visitedNodeIds, selectedNodeId, onNodeClick, cumulativeCounts, layoutDirection = "vertical"}: Props): JSX.Element {
    const horizontal = layoutDirection === "horizontal";
    const containerRef = useRef<HTMLDivElement>(null);
    const vpRef = useRef<Viewport>({
        x: 0,
        y: 0,
        zoom: 1
    });
    const [viewport, setVP] = useState<Viewport>({
        x: 0,
        y: 0,
        zoom: 1
    });
    const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
    const movedRef = useRef(false);
    // Real DOM heights of each node card, measured from a hidden layer (no estimates).
    const measureRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const [heights, setHeights] = useState<Map<string, number>>(new Map());
    // Container pixel size, tracked in state so the minimap gets a real value
    // without reading the DOM ref during render (an impure render-time read).
    // The initial 800x600 is a pre-measure placeholder; the layout effect below
    // overwrites it with the real box before first paint.
    const [size, setSize] = useState<{ w: number; h: number }>({
        w: 800,
        h: 600
    });

    const syncVP = useCallback((v: Viewport) => { vpRef.current = v; setVP(v); }, []);

    // Keep `size` in sync with the container's box via a ResizeObserver (also
    // measured once synchronously on mount so the first paint isn't stale).
    useLayoutEffect(() => {
        const el = containerRef.current;
        /* v8 ignore next -- defensive: the container ref is always attached on mount */
        if (!el) {return;}
        // Skip the state update (and the whole-canvas re-render) when the box is
        // unchanged, so a resize storm doesn't re-render on every callback.
        const update = (): void => setSize((prev) =>
            prev.w === el.offsetWidth && prev.h === el.offsetHeight
                ? prev
                : {
                    w: el.offsetWidth,
                    h: el.offsetHeight
                });
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return (): void => ro.disconnect();
    }, []);

    // Measure the hidden layer's real card heights whenever the graph changes.
    // Runs before paint, so the positioned layout below uses true measurements.
    useLayoutEffect(() => {
        const measure = (): void => {
            const next = new Map<string, number>();
            for (const n of graphNodes) {
                const el = measureRefs.current.get(n.id);
                if (el) {next.set(n.id, el.offsetHeight);}
            }
            setHeights((prev) => {
                if (prev.size === next.size && [...next].every(([k, v]) => prev.get(k) === v)) {return prev;}
                return next;
            });
        };
        measure();
        // Re-measure once the web font is ready — text wrapping (and height) depends on it.
        let cancelled = false;
        document.fonts?.ready.then(() => { if (!cancelled) {measure();} });
        return (): void => { cancelled = true; };
    }, [graphNodes]);

    // Inherited-decision forks: the chain of flag-setting choices at the very top
    // (start -> setup_* -> ... -> first real node). We pull them out of the tree and
    // show them as a detached list above it. Presentation only — the data still
    // drives routing, so the pathfinder keeps each variable consistent.
    const inherited = useMemo(() => {
        const byId = new Map<string, GraphNode>(graphNodes.map((n) => [n.id, n] as [string, GraphNode]));
        const children = new Map<string, string[]>();
        for (const e of graphEdges) {
            const arr = children.get(e.source);
            if (arr) {arr.push(e.target);} else {children.set(e.source, [e.target]);}
        }
        const forks: { id: string; variable: string; options: { label: string; value: boolean | number | string; ciId: string }[] }[] = [];
        const hidden = new Set<string>();
        let cur: string | undefined = "start";
        let contentRoot = "start";
        while (cur) {
            const node = byId.get(cur);
            if (!node || node.type !== "choice") { contentRoot = cur; break; }
            const items: GraphNode[] = (children.get(cur) ?? [])
                .map((id) => byId.get(id))
                .filter((n): n is GraphNode => !!n && n.type === "choiceItem");
            const targets: (string | undefined)[] = items.map((it) => (children.get(it.id) ?? [])[0]);
            const isFork = items.length >= 2
        && items.every((it) => it.sets && it.sets.length === 1 && !it.text)
        && targets.every((t) => t && t === targets[0]);
            if (!isFork) { contentRoot = cur; break; }
            forks.push({
                id: cur,
                variable: items[0]!.sets![0]!.name,
                options: items.map((it) => ({
                    label: it.choiceName ?? "",
                    value: it.sets![0]!.value,
                    ciId: it.id
                })),
            });
            hidden.add(cur);
            items.forEach((it) => hidden.add(it.id));
            cur = targets[0];
        }
        return {
            forks,
            hidden,
            contentRoot
        };
    }, [graphNodes, graphEdges]);

    // The edges actually drawn: both endpoints must be visible (setup-fork nodes
    // are hidden). Single source of truth, shared by the dagre layout and the
    // edge-path rendering so the two can't disagree about which edges exist.
    const visibleEdges = useMemo(
        () => graphEdges.filter((e) => !inherited.hidden.has(e.source) && !inherited.hidden.has(e.target)),
        [graphEdges, inherited],
    );

    // Layout — waits until every current node has a measured height, then lays out.
    const posNodes = useMemo<PosNode[]>(() => {
        if (graphNodes.length === 0) {return [];}
        const visNodes = graphNodes.filter((n) => !inherited.hidden.has(n.id));
        // Bail until every visible node has a measured height; after this guard
        // `heights.get(n.id)!` below is total for the current node set.
        if (visNodes.some((n) => !heights.has(n.id))) {return [];}
        const rfNodes: LayoutNode<GraphNode>[] = visNodes.map((n) => ({
            id: n.id,
            type: n.type,
            position: {
                x: 0,
                y: 0
            },
            style: {width: nodeWidth(n.type)},
            data: n,
        }));
        const rfEdges: LayoutEdge[] = visibleEdges.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target
        }));
        const laid = applyDagreLayout(rfNodes, rfEdges, heights, layoutDirection);
        return laid.map((n) => ({
            id: n.id,
            x: n.position.x,
            y: n.position.y,
            w: n.style.width,
            h: heights.get(n.id)!,
            node: n.data,
        }));
    }, [graphNodes, visibleEdges, heights, inherited, layoutDirection]);

    // Initial viewport: centre the first real node (start may be a hidden fork)
    useEffect(() => {
        const el = containerRef.current;
        if (!el || posNodes.length === 0) {return;}
        const root = posNodes.find((n) => n.id === inherited.contentRoot) ?? posNodes[0]!;
        syncVP(framedView(el, root, 1.2));
    }, [posNodes, syncVP, inherited.contentRoot]);

    // Wheel zoom/pan (needs a non-passive listener so preventDefault works).
    // Re-runs on graphNodes.length so it (re)attaches when the canvas mounts —
    // the container isn't rendered until a graph is loaded (see the early
    // return below), and this effect's deps must change for it to retry.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) {return;}
        const onWheel = (e: WheelEvent): void => {
            e.preventDefault();
            const v = vpRef.current;
            // Ctrl/Cmd + wheel (and trackpad pinch, which sends ctrlKey) → zoom toward cursor.
            if (e.ctrlKey || e.metaKey) {
                const factor = e.deltaY < 0 ? 1.1 : 0.9;
                const rect = el.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const z = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
                syncVP({
                    x: mx - (mx - v.x) * (z / v.zoom),
                    y: my - (my - v.y) * (z / v.zoom),
                    zoom: z
                });
                return;
            }
            // Plain wheel/trackpad → pan (natural direction).
            syncVP({
                ...v,
                x: v.x - e.deltaX,
                y: v.y - e.deltaY
            });
        };
        el.addEventListener("wheel", onWheel, {passive: false});
        return (): void => el.removeEventListener("wheel", onWheel);
    }, [syncVP, graphNodes.length]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) {return;}
        movedRef.current = false;
        const v = vpRef.current;
        dragRef.current = {
            sx: e.clientX,
            sy: e.clientY,
            ox: v.x,
            oy: v.y
        };
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!dragRef.current) {return;}
        const dx = e.clientX - dragRef.current.sx;
        const dy = e.clientY - dragRef.current.sy;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {movedRef.current = true;}
        if (!movedRef.current) {return;}
        syncVP({
            ...vpRef.current,
            x: dragRef.current.ox + dx,
            y: dragRef.current.oy + dy
        });
    }, [syncVP]);

    const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

    // Zoom around the canvas centre (used by the +/- buttons)
    const zoomBy = useCallback((factor: number) => {
        const el = containerRef.current;
        /* v8 ignore next -- defensive: the zoom controls only exist while the canvas is mounted */
        if (!el) {return;}
        const cx = el.offsetWidth / 2;
        const cy = el.offsetHeight / 2;
        const v = vpRef.current;
        const z = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
        syncVP({
            x: cx - (cx - v.x) * (z / v.zoom),
            y: cy - (cy - v.y) * (z / v.zoom),
            zoom: z
        });
    }, [syncVP]);

    // Pan the viewport by a fixed screen-space step
    const panBy = useCallback((dx: number, dy: number) => {
        const v = vpRef.current;
        syncVP({
            ...v,
            x: v.x + dx,
            y: v.y + dy
        });
    }, [syncVP]);

    // Reset to the initial view (centre the "start" node at 1.2x)
    const resetView = useCallback(() => {
        const el = containerRef.current;
        /* v8 ignore next -- defensive: reset only runs with a mounted, laid-out canvas */
        if (!el || posNodes.length === 0) {return;}
        /* v8 ignore next -- defensive: contentRoot is always a laid-out node */
        const root = posNodes.find((n) => n.id === inherited.contentRoot) ?? posNodes[0]!;
        syncVP(framedView(el, root, 1.2));
    }, [posNodes, syncVP, inherited.contentRoot]);

    const handleNodeClick = useCallback((id: string) => {
        if (!movedRef.current) {onNodeClick(id);}
    }, [onNodeClick]);

    // Centre a node in the view, both axes (keeps the current zoom).
    const focusNode = useCallback((nodeId: string) => {
        const el = containerRef.current;
        const n = posNodes.find((p) => p.id === nodeId);
        /* v8 ignore next -- defensive: focusNode is only called with present TOC node ids */
        if (!el || !n) {return;}
        const zoom = vpRef.current.zoom;
        syncVP({
            x: centerX(el, n, zoom),
            y: centerY(el, n, zoom),
            zoom,
        });
    }, [posNodes, syncVP]);

    // Table of contents: curated outline entries that exist in this graph.
    const present = useMemo(() => new Set(posNodes.map((n) => n.id)), [posNodes]);
    const toc = useMemo(
        () => (TOC[scriptId ?? ""] ?? []).filter((e) => present.has(e.nodeId)),
        [scriptId, present]
    );
    const [tocIdx, setTocIdx] = useState(0);
    useEffect(() => { setTocIdx(0); }, [scriptId]);

    const goToToc = useCallback((idx: number) => {
        /* v8 ignore next -- defensive: the TOC nav only renders when there are entries */
        if (toc.length === 0) {return;}
        const i = clamp(idx, 0, toc.length - 1);
        setTocIdx(i);
        focusNode(toc[i]!.nodeId);
    }, [toc, focusNode]);

    // Edge rendering
    const edgePaths = useMemo(() => {
        const byId = new Map(posNodes.map((n) => [n.id, n]));
        const visitedEdge = (e: GraphEdge): boolean => visitedNodeIds.has(e.source) && visitedNodeIds.has(e.target);
        return visibleEdges.map((e) => {
            const src = byId.get(e.source);
            const tgt = byId.get(e.target);
            // null only while the layout isn't ready yet (posNodes empty); a
            // visible edge's endpoints are always laid out once heights measure.
            if (!src || !tgt) {return null;}
            const hl = visitedEdge(e);
            const stroke = hl ? "#22c55e"
                : e.edgeType === "conditional" ? "#f59e0b"
                    : e.edgeType === "choice" ? "#818cf8"
                        : "#475569";
            // Attach edges on the flow-facing sides: bottom→top when vertical,
            // right→left when horizontal.
            const [sx, sy] = horizontal
                ? [src.x + src.w, src.y + src.h / 2]
                : [src.x + src.w / 2, src.y + src.h];
            const [tx, ty] = horizontal
                ? [tgt.x, tgt.y + tgt.h / 2]
                : [tgt.x + tgt.w / 2, tgt.y];
            return {
                id: e.id,
                d: edgePath(sx, sy, tx, ty, horizontal),
                stroke,
                strokeWidth: hl ? 2.5 : 1.5,
                animated: hl,
                label: e.label,
                lx: (sx + tx) / 2,
                ly: (sy + ty) / 2,
                hl,
            };
        });
    }, [posNodes, visibleEdges, visitedNodeIds, horizontal]);

    if (graphNodes.length === 0) {
        return <div className="canvas-empty"><p>Select a script to visualize its dialogue graph.</p></div>;
    }

    const {x, y, zoom} = viewport;

    // Detached list of inherited decisions, stacked above the graph's top node.
    const INH_W = 320, INH_GAP = 8;
    // Each option wraps onto (roughly) its own row in the 320px card, so height
    // grows with option count rather than being fixed — 5-value forks fit cleanly.
    const inhCardH = (nOpts: number): number => 30 + nOpts * 20;
    const inheritedCards = ((): Array<{id: string; variable: string; height: number; options: {label: string; onPath: boolean}[]; left: number; top: number}> => {
        if (inherited.forks.length === 0 || posNodes.length === 0) {return [];}
        const topY = Math.min(...posNodes.map((n) => n.y));
        /* v8 ignore next -- defensive: contentRoot is always a laid-out node */
        const root = posNodes.find((n) => n.id === inherited.contentRoot) ?? posNodes[0]!;
        const cx = root.x + root.w / 2;
        const heights = inherited.forks.map((f) => inhCardH(f.options.length));
        const totalH = heights.reduce((a, h) => a + h + INH_GAP, 0) - INH_GAP;
        const listTop = topY - 72 - totalH;
        let cursor = listTop;
        return inherited.forks.map((f, i) => {
            const top = cursor;
            cursor += heights[i]! + INH_GAP;
            return {
                id: f.id,
                variable: f.variable,
                height: heights[i]!,
                options: f.options.map((o) => ({
                    label: o.label,
                    onPath: visitedNodeIds.has(o.ciId)
                })),
                left: cx - INH_W / 2,
                top,
            };
        });
    })();

    return (
        // The canvas is a mouse/trackpad pan-drag surface; keyboard users pan
        // and jump via the accessible button controls and table of contents.
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            ref={containerRef}
            className="graph-canvas"
            style={{
                overflow: "hidden",
                cursor: dragRef.current ? "grabbing" : "grab",
                userSelect: "none"
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            >
            {/* Hidden measurement layer: real card heights feed the dagre layout. */}
            <div aria-hidden style={{
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "hidden",
                pointerEvents: "none",
                zIndex: -1
            }}>
                {graphNodes.map((n) => (
                    <div
                        key={n.id}
                        ref={(el) => { if (el) {measureRefs.current.set(n.id, el);} else {measureRefs.current.delete(n.id);} }}
                        style={{width: nodeWidth(n.type)}}
          >
                        <MemoCard node={n} highlighted={false} selected={false} onClick={NOOP} />
                    </div>
                ))}
            </div>
            <div style={{
                position: "absolute",
                transform: `translate(${x}px,${y}px) scale(${zoom})`,
                transformOrigin: "0 0"
            }}>
                {/* SVG edge layer — decorative; adjacency/route is conveyed to AT
                    by the node cards' aria-current and the Shortest Path list. */}
                <svg aria-hidden="true" style={{
                    position: "absolute",
                    inset: 0,
                    width: 0,
                    height: 0,
                    overflow: "visible",
                    pointerEvents: "none"
                }}>
                    {edgePaths.map((e) => e && (
                    <path key={e.id} d={e.d} fill="none" stroke={e.stroke} strokeWidth={e.strokeWidth} />
                    ))}
                    {edgePaths.map((e) => e && e.label && (
                    <text
                        key={e.id + "-lbl"}
                        x={e.lx}
                        y={e.ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily: "ui-monospace, monospace",
                            fill: e.hl ? "#22c55e" : "#f59e0b",
                            stroke: "#020617",
                            strokeWidth: 4,
                            paintOrder: "stroke",
                            strokeLinejoin: "round",
                        }}
            >
                        {e.label}
                    </text>
                    ))}
                </svg>
                {/* HTML node layer */}
                {posNodes.map((n) => (
                    <div key={n.id} style={{
                        position: "absolute",
                        left: n.x,
                        top: n.y,
                        width: n.w
                    }}>
                        <MemoCard
                            node={n.node}
                            highlighted={visitedNodeIds.has(n.id)}
                            selected={selectedNodeId === n.id}
                            onClick={() => handleNodeClick(n.id)}
                            cumulative={cumulativeCounts[n.id]}
            />
                    </div>
                ))}
                {/* Detached list of inherited decisions (presentation only, not connected) */}
                {inheritedCards.map((c) => (
                    <div
                        key={c.id}
                        className="inherited-card"
                        style={{
                            position: "absolute",
                            left: c.left,
                            top: c.top,
                            width: INH_W
                        }}
          >
                        <span className="inherited-var">{c.variable}</span>
                        <div className="inherited-opts">
                            {c.options.map((o, i) => (
                                <span key={i} className={`inherited-opt${o.onPath ? " on-path" : ""}`}>{o.label}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {toc.length > 0 && (
            // onMouseDown only stops the drag from bubbling to the canvas; the
            // interactive elements inside are native, accessible <button>s.
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className="toc-panel" onMouseDown={(e) => e.stopPropagation()}>
                <div className="toc-header">Contents</div>
                <div className="toc-list">
                    {toc.map((e, i) => (
                        <button
                            key={e.nodeId}
                            type="button"
                            title={e.nodeId}
                            className={`toc-item toc-${e.kind}${i === tocIdx ? " active" : ""}`}
                            onClick={() => goToToc(i)}
              >
                            {e.kind === "decision" && <span className="toc-diamond">◆</span>}
                            <span className="toc-title">{e.title}</span>
                        </button>
                    ))}
                </div>
                <div className="toc-nav">
                    <button type="button" onClick={() => goToToc(tocIdx - 1)} disabled={tocIdx <= 0}>◀ Prev</button>
                    <button type="button" onClick={() => goToToc(tocIdx + 1)} disabled={tocIdx >= toc.length - 1}>Next ▶</button>
                </div>
            </div>
            )}
            {/* onMouseDown only stops the drag from bubbling; the controls inside are native buttons. */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className="canvas-controls"
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                    position: "absolute",
                    left: 12,
                    bottom: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    zIndex: 10,
                }}
      >
                {/* Directional pan pad */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 32px)",
                    gridTemplateRows: "repeat(3, 32px)",
                    gap: 4
                }}>
                    <span />
                    <button type="button" title="Pan up" aria-label="Pan up" onClick={() => panBy(0, PAN_STEP)} style={zoomBtnStyle}>▲</button>
                    <span />
                    <button type="button" title="Pan left" aria-label="Pan left" onClick={() => panBy(PAN_STEP, 0)} style={zoomBtnStyle}>◀</button>
                    <button type="button" title="Reset view" aria-label="Reset view" onClick={resetView} style={{
                        ...zoomBtnStyle,
                        fontSize: 15
                    }}>⌂</button>
                    <button type="button" title="Pan right" aria-label="Pan right" onClick={() => panBy(-PAN_STEP, 0)} style={zoomBtnStyle}>▶</button>
                    <span />
                    <button type="button" title="Pan down" aria-label="Pan down" onClick={() => panBy(0, -PAN_STEP)} style={zoomBtnStyle}>▼</button>
                    <span />
                </div>
                {/* Zoom */}
                <div style={{
                    display: "flex",
                    gap: 4
                }}>
                    <button type="button" title="Zoom in" aria-label="Zoom in" onClick={() => zoomBy(1.2)} style={zoomBtnStyle}>+</button>
                    <button type="button" title="Zoom out" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)} style={zoomBtnStyle}>−</button>
                </div>
            </div>
            <Minimap
                posNodes={posNodes}
                visitedNodeIds={visitedNodeIds}
                viewport={viewport}
                containerW={size.w}
                containerH={size.h}
                horizontal={horizontal}
                onNavigate={syncVP}
      />
        </div>
    );
}
