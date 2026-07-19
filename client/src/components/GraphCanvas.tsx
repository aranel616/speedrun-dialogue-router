import {useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef, memo} from "react";
import type {Node, Edge} from "@xyflow/react";
import type {GraphNode, GraphEdge} from "../types";
import {applyDagreLayout} from "../utils/dagreLayout";
import {TOC} from "../toc";

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 3;
const PAN_STEP = 140; // px the pan buttons move the view per click

const zoomBtnStyle: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 6, border: "1px solid #475569",
    background: "#1e293b", color: "#e2e8f0", fontSize: 20, lineHeight: 1,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    padding: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
};

// Fixed render width per node type (matches the card CSS). Height is measured
// from the real DOM rather than estimated — see the hidden measurement layer.
function nodeWidth(type: GraphNode["type"]): number {
    return type === "choiceItem" ? 330 : type === "conditionItem" ? 260 : 420;
}

const NOOP = () => {};

interface Viewport { x: number; y: number; zoom: number }
interface PosNode { id: string; x: number; y: number; w: number; h: number; node: GraphNode }

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function edgePath(sx: number, sy: number, tx: number, ty: number): string {
    const my = (sy + ty) / 2;
    return `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`;
}

function cleanLabel(id: string): string {
    return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function NodeCard({node, highlighted, selected, onClick, cumulative}: {
  node: GraphNode; highlighted: boolean; selected: boolean; onClick: ()=> void; cumulative?: number;
}) {
    if (node.type === "choice") {
        return (
            <div
                onClick={onClick}
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
                onClick={onClick}
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
                onClick={onClick}
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
            onClick={onClick}
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

const MM_W = 140;
const MM_H = 720;
const MM_PAD = 8;

function Minimap({posNodes, visitedNodeIds, viewport, containerW, containerH, onNavigate}: {
  posNodes: PosNode[];
  visitedNodeIds: Set<string>;
  viewport: Viewport;
  containerW: number;
  containerH: number;
  onNavigate: (v: Viewport)=> void;
}) {
    const dragging = useRef(false);
    if (posNodes.length === 0) {return null;}

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

    function toMM(gx: number, gy: number) {
        return {mx: MM_PAD + (gx - gx0) * scaleX, my: MM_PAD + (gy - gy0) * scaleY};
    }

    const {y: vy, zoom: vz} = viewport;
    const vpTopGraphY = -vy / vz;

    // Viewport indicator: a full-width band that only moves vertically.
    const vpMY = MM_PAD + (vpTopGraphY - gy0) * scaleY;
    const vpMH = (containerH / vz) * scaleY;

    // Navigation is vertical-only; the graph stays horizontally centred.
    function navigate(e: React.MouseEvent<SVGSVGElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const gy = (e.clientY - rect.top - MM_PAD) / scaleY + gy0;
        const gxc = gx0 + gW / 2;
        onNavigate({x: containerW / 2 - gxc * vz, y: containerH / 2 - gy * vz, zoom: vz});
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
            <rect x={MM_PAD} y={vpMY}
                width={innerW} height={Math.max(6, vpMH)}
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
}

export function GraphCanvas({scriptId, graphNodes, graphEdges, visitedNodeIds, selectedNodeId, onNodeClick, cumulativeCounts}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const vpRef = useRef<Viewport>({x: 0, y: 0, zoom: 1});
    const [viewport, setVP] = useState<Viewport>({x: 0, y: 0, zoom: 1});
    const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
    const movedRef = useRef(false);
    // Real DOM heights of each node card, measured from a hidden layer (no estimates).
    const measureRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const [heights, setHeights] = useState<Map<string, number>>(new Map());

    const syncVP = useCallback((v: Viewport) => { vpRef.current = v; setVP(v); }, []);

    // Measure the hidden layer's real card heights whenever the graph changes.
    // Runs before paint, so the positioned layout below uses true measurements.
    useLayoutEffect(() => {
        const measure = () => {
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
        return () => { cancelled = true; };
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
                options: items.map((it) => ({label: it.choiceName ?? "", value: it.sets![0]!.value, ciId: it.id})),
            });
            hidden.add(cur);
            items.forEach((it) => hidden.add(it.id));
            cur = targets[0];
        }
        return {forks, hidden, contentRoot};
    }, [graphNodes, graphEdges]);

    // Layout — waits until every current node has a measured height, then lays out.
    const posNodes = useMemo<PosNode[]>(() => {
        if (graphNodes.length === 0) {return [];}
        const visNodes = graphNodes.filter((n) => !inherited.hidden.has(n.id));
        if (visNodes.some((n) => !heights.has(n.id))) {return [];} // heights not measured yet
        console.log(`[GraphCanvas] computing layout for ${visNodes.length} nodes, ${graphEdges.length} edges`);
        const rfNodes: Node[] = visNodes.map((n) => ({
            id: n.id,
            type: n.type,
            position: {x: 0, y: 0},
            style: {width: nodeWidth(n.type)},
            data: n as unknown as Record<string, unknown>,
        }));
        const rfEdges: Edge[] = graphEdges
            .filter((e) => !inherited.hidden.has(e.source) && !inherited.hidden.has(e.target))
            .map((e) => ({id: e.id, source: e.source, target: e.target}));
        const laid = applyDagreLayout(rfNodes, rfEdges, heights);
        console.log(`[GraphCanvas] layout returned ${laid.length} positioned nodes`);
        return laid.map((n) => ({
            id: n.id,
            x: n.position.x,
            y: n.position.y,
            w: (n.style as { width: number }).width,
            h: heights.get(n.id)!,
            node: n.data as unknown as GraphNode,
        }));
    }, [graphNodes, graphEdges, heights, inherited]);

    // Initial viewport: centre the first real node (start may be a hidden fork)
    useEffect(() => {
        const el = containerRef.current;
        if (!el || posNodes.length === 0) {return;}
        const root = posNodes.find((n) => n.id === inherited.contentRoot) ?? posNodes[0]!;
        const zoom = 1.2;
        const x = el.offsetWidth / 2 - (root.x + root.w / 2) * zoom;
        const y = el.offsetHeight / 3 - (root.y + root.h / 2) * zoom;
        syncVP({x, y, zoom});
    }, [posNodes, syncVP, inherited.contentRoot]);

    // Wheel zoom (needs non-passive listener)
    useEffect(() => {
        const el = containerRef.current;
        if (!el) {return;}
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const v = vpRef.current;
            // Ctrl/Cmd + wheel (and trackpad pinch, which sends ctrlKey) → zoom toward cursor.
            if (e.ctrlKey || e.metaKey) {
                const factor = e.deltaY < 0 ? 1.1 : 0.9;
                const rect = el.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;
                const z = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
                syncVP({x: mx - (mx - v.x) * (z / v.zoom), y: my - (my - v.y) * (z / v.zoom), zoom: z});
                return;
            }
            // Plain wheel/trackpad → pan (natural direction).
            syncVP({...v, x: v.x - e.deltaX, y: v.y - e.deltaY});
        };
        el.addEventListener("wheel", onWheel, {passive: false});
        return () => el.removeEventListener("wheel", onWheel);
    }, [syncVP]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) {return;}
        movedRef.current = false;
        const v = vpRef.current;
        dragRef.current = {sx: e.clientX, sy: e.clientY, ox: v.x, oy: v.y};
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!dragRef.current) {return;}
        const dx = e.clientX - dragRef.current.sx;
        const dy = e.clientY - dragRef.current.sy;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {movedRef.current = true;}
        if (!movedRef.current) {return;}
        syncVP({...vpRef.current, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy});
    }, [syncVP]);

    const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

    // Zoom around the canvas centre (used by the +/- buttons)
    const zoomBy = useCallback((factor: number) => {
        const el = containerRef.current;
        if (!el) {return;}
        const cx = el.offsetWidth / 2;
        const cy = el.offsetHeight / 2;
        const v = vpRef.current;
        const z = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
        syncVP({x: cx - (cx - v.x) * (z / v.zoom), y: cy - (cy - v.y) * (z / v.zoom), zoom: z});
    }, [syncVP]);

    // Pan the viewport by a fixed screen-space step
    const panBy = useCallback((dx: number, dy: number) => {
        const v = vpRef.current;
        syncVP({...v, x: v.x + dx, y: v.y + dy});
    }, [syncVP]);

    // Reset to the initial view (centre the "start" node at 1.2x)
    const resetView = useCallback(() => {
        const el = containerRef.current;
        if (!el || posNodes.length === 0) {return;}
        const root = posNodes.find((n) => n.id === inherited.contentRoot) ?? posNodes[0]!;
        const zoom = 1.2;
        syncVP({
            x: el.offsetWidth / 2 - (root.x + root.w / 2) * zoom,
            y: el.offsetHeight / 3 - (root.y + root.h / 2) * zoom,
            zoom,
        });
    }, [posNodes, syncVP, inherited.contentRoot]);

    const handleNodeClick = useCallback((id: string) => {
        if (!movedRef.current) {onNodeClick(id);}
    }, [onNodeClick]);

    // Align a node near the top of the view, horizontally centred (keeps zoom).
    const focusNode = useCallback((nodeId: string) => {
        const el = containerRef.current;
        const n = posNodes.find((p) => p.id === nodeId);
        if (!el || !n) {return;}
        const zoom = vpRef.current.zoom;
        const TOP_PAD = 24;
        syncVP({
            x: el.offsetWidth / 2 - (n.x + n.w / 2) * zoom,
            y: TOP_PAD - n.y * zoom,
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
        if (toc.length === 0) {return;}
        const i = clamp(idx, 0, toc.length - 1);
        setTocIdx(i);
        focusNode(toc[i]!.nodeId);
    }, [toc, focusNode]);

    // Edge rendering
    const edgePaths = useMemo(() => {
        const byId = new Map(posNodes.map((n) => [n.id, n]));
        const visitedEdge = (e: GraphEdge) => visitedNodeIds.has(e.source) && visitedNodeIds.has(e.target);
        return graphEdges.map((e) => {
            const src = byId.get(e.source);
            const tgt = byId.get(e.target);
            if (!src || !tgt) {return null;}
            const hl = visitedEdge(e);
            const stroke = hl ? "#22c55e"
                : e.edgeType === "conditional" ? "#f59e0b"
                    : e.edgeType === "choice" ? "#818cf8"
                        : "#475569";
            const sx = src.x + src.w / 2, sy = src.y + src.h;
            const tx = tgt.x + tgt.w / 2, ty = tgt.y;
            return {
                id: e.id,
                d: edgePath(sx, sy, tx, ty),
                stroke,
                strokeWidth: hl ? 2.5 : 1.5,
                animated: hl,
                label: e.label,
                lx: (sx + tx) / 2,
                ly: (sy + ty) / 2,
                hl,
            };
        });
    }, [posNodes, graphEdges, visitedNodeIds]);

    if (graphNodes.length === 0) {
        return <div className="canvas-empty"><p>Select a script to visualize its dialogue graph.</p></div>;
    }

    const {x, y, zoom} = viewport;

    // Detached list of inherited decisions, stacked above the graph's top node.
    const INH_W = 320, INH_GAP = 8;
    // Each option wraps onto (roughly) its own row in the 320px card, so height
    // grows with option count rather than being fixed — 5-value forks fit cleanly.
    const inhCardH = (nOpts: number) => 30 + nOpts * 20;
    const inheritedCards = (() => {
        if (inherited.forks.length === 0 || posNodes.length === 0) {return [];}
        const topY = Math.min(...posNodes.map((n) => n.y));
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
                options: f.options.map((o) => ({label: o.label, onPath: visitedNodeIds.has(o.ciId)})),
                left: cx - INH_W / 2,
                top,
            };
        });
    })();

    return (
        <div
            ref={containerRef}
            className="graph-canvas"
            style={{overflow: "hidden", cursor: dragRef.current ? "grabbing" : "grab", userSelect: "none"}}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            >
            {/* Hidden measurement layer: real card heights feed the dagre layout. */}
            <div aria-hidden style={{position: "absolute", top: 0, left: 0, visibility: "hidden", pointerEvents: "none", zIndex: -1}}>
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
            <div style={{position: "absolute", transform: `translate(${x}px,${y}px) scale(${zoom})`, transformOrigin: "0 0"}}>
                {/* SVG edge layer */}
                <svg style={{position: "absolute", inset: 0, width: 0, height: 0, overflow: "visible", pointerEvents: "none"}}>
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
                    <div key={n.id} style={{position: "absolute", left: n.x, top: n.y, width: n.w}}>
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
                        style={{position: "absolute", left: c.left, top: c.top, width: INH_W}}
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
            <div
                className="canvas-controls"
                onMouseDown={(e) => e.stopPropagation()}
                style={{
          position: "absolute", left: 12, bottom: 12, display: "flex", flexDirection: "column",
          gap: 8, zIndex: 10,
        }}
      >
                {/* Directional pan pad */}
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 32px)", gridTemplateRows: "repeat(3, 32px)", gap: 4}}>
                    <span />
                    <button type="button" title="Pan up" aria-label="Pan up" onClick={() => panBy(0, PAN_STEP)} style={zoomBtnStyle}>▲</button>
                    <span />
                    <button type="button" title="Pan left" aria-label="Pan left" onClick={() => panBy(PAN_STEP, 0)} style={zoomBtnStyle}>◀</button>
                    <button type="button" title="Reset view" aria-label="Reset view" onClick={resetView} style={{...zoomBtnStyle, fontSize: 15}}>⌂</button>
                    <button type="button" title="Pan right" aria-label="Pan right" onClick={() => panBy(-PAN_STEP, 0)} style={zoomBtnStyle}>▶</button>
                    <span />
                    <button type="button" title="Pan down" aria-label="Pan down" onClick={() => panBy(0, -PAN_STEP)} style={zoomBtnStyle}>▼</button>
                    <span />
                </div>
                {/* Zoom */}
                <div style={{display: "flex", gap: 4}}>
                    <button type="button" title="Zoom in" aria-label="Zoom in" onClick={() => zoomBy(1.2)} style={zoomBtnStyle}>+</button>
                    <button type="button" title="Zoom out" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)} style={zoomBtnStyle}>−</button>
                </div>
            </div>
            <Minimap
                posNodes={posNodes}
                visitedNodeIds={visitedNodeIds}
                viewport={viewport}
                containerW={containerRef.current?.offsetWidth ?? 800}
                containerH={containerRef.current?.offsetHeight ?? 600}
                onNavigate={syncVP}
      />
        </div>
    );
}
