import { useState, useCallback, useMemo, useEffect, useRef, memo } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { GraphNode, GraphEdge } from "../types";
import { applyDagreLayout } from "../utils/dagreLayout";

const NODE_H = 64;
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 3;

interface Viewport { x: number; y: number; zoom: number; }
interface PosNode { id: string; x: number; y: number; w: number; node: GraphNode; }

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function edgePath(sx: number, sy: number, tx: number, ty: number): string {
  const my = (sy + ty) / 2;
  return `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`;
}

function NodeCard({ node, highlighted, selected, onClick }: {
  node: GraphNode; highlighted: boolean; selected: boolean; onClick: () => void;
}) {
  if (node.type === "choice") {
    return (
      <div
        onClick={onClick}
        className={`dialogue-node choice-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}`}
      >
        <div className="node-id">{node.id}</div>
      </div>
    );
  }
  if (node.type === "choiceItem") {
    const preview = Array.isArray(node.text) ? node.text[0] : node.text;
    return (
      <div
        onClick={onClick}
        className={`choice-item-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}${node.isTerminal ? " terminal" : ""}`}
      >
        <div className="ci-name">{node.choiceName}</div>
        {preview && <div className="ci-preview">{preview.length > 44 ? preview.slice(0, 41) + "…" : preview}</div>}
        {node.sets && node.sets.length > 0 && (
          <div className="ci-sets">
            {node.sets.map((s, i) => <span key={i} className="set-badge">{s.name}={String(s.value)}</span>)}
          </div>
        )}
      </div>
    );
  }
  // linear
  const preview = Array.isArray(node.text) ? node.text[0] : node.text;
  return (
    <div
      onClick={onClick}
      className={`dialogue-node linear-node${selected ? " selected" : ""}${highlighted ? " highlighted" : ""}${node.isTerminal ? " terminal" : ""}`}
    >
      <div className="node-id">{node.id}</div>
      {preview && <div className="node-preview">{preview.length > 50 ? preview.slice(0, 47) + "…" : preview}</div>}
    </div>
  );
}

const MemoCard = memo(NodeCard);

interface Props {
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  visitedNodeIds: Set<string>;
  selectedNodeId: string | null;
  onNodeClick: (id: string) => void;
}

export function GraphCanvas({ graphNodes, graphEdges, visitedNodeIds, selectedNodeId, onNodeClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vpRef = useRef<Viewport>({ x: 0, y: 0, zoom: 1 });
  const [viewport, setVP] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const movedRef = useRef(false);

  const syncVP = useCallback((v: Viewport) => { vpRef.current = v; setVP(v); }, []);

  // Layout — only recomputes when graph changes
  const posNodes = useMemo<PosNode[]>(() => {
    console.log(`[GraphCanvas] computing layout for ${graphNodes.length} nodes, ${graphEdges.length} edges`);
    const rfNodes: Node[] = graphNodes.map(n => ({
      id: n.id,
      type: n.type,
      position: { x: 0, y: 0 },
      style: { width: n.type === "choiceItem" ? 160 : 200 },
      data: n as unknown as Record<string, unknown>,
    }));
    const rfEdges: Edge[] = graphEdges.map(e => ({ id: e.id, source: e.source, target: e.target }));
    const laid = applyDagreLayout(rfNodes, rfEdges);
    console.log(`[GraphCanvas] layout returned ${laid.length} positioned nodes`);
    return laid.map(n => ({
      id: n.id,
      x: n.position.x,
      y: n.position.y,
      w: (n.style as { width: number }).width,
      node: n.data as unknown as GraphNode,
    }));
  }, [graphNodes, graphEdges]);

  // Initial viewport: centre "start" node
  useEffect(() => {
    const el = containerRef.current;
    if (!el || posNodes.length === 0) return;
    const start = posNodes.find(n => n.id === "start") ?? posNodes[0]!;
    const zoom = 1.2;
    const x = el.offsetWidth / 2 - (start.x + start.w / 2) * zoom;
    const y = el.offsetHeight / 3 - (start.y + NODE_H / 2) * zoom;
    syncVP({ x, y, zoom });
  }, [posNodes, syncVP]);

  // Wheel zoom (needs non-passive listener)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const v = vpRef.current;
      const z = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
      syncVP({ x: mx - (mx - v.x) * (z / v.zoom), y: my - (my - v.y) * (z / v.zoom), zoom: z });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [syncVP]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    movedRef.current = false;
    const v = vpRef.current;
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: v.x, oy: v.y };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
    if (!movedRef.current) return;
    syncVP({ ...vpRef.current, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy });
  }, [syncVP]);

  const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const handleNodeClick = useCallback((id: string) => {
    if (!movedRef.current) onNodeClick(id);
  }, [onNodeClick]);

  // Edge rendering
  const edgePaths = useMemo(() => {
    const byId = new Map(posNodes.map(n => [n.id, n]));
    const visitedEdge = (e: GraphEdge) => visitedNodeIds.has(e.source) && visitedNodeIds.has(e.target);
    return graphEdges.map(e => {
      const src = byId.get(e.source);
      const tgt = byId.get(e.target);
      if (!src || !tgt) return null;
      const hl = visitedEdge(e);
      const stroke = hl ? "#22c55e"
        : e.edgeType === "conditional" ? "#f59e0b"
        : e.edgeType === "choice" ? "#818cf8"
        : "#475569";
      return {
        id: e.id,
        d: edgePath(src.x + src.w / 2, src.y + NODE_H, tgt.x + tgt.w / 2, tgt.y),
        stroke,
        strokeWidth: hl ? 2.5 : 1.5,
        animated: hl,
      };
    });
  }, [posNodes, graphEdges, visitedNodeIds]);

  if (graphNodes.length === 0) {
    return <div className="canvas-empty"><p>Select a script to visualize its dialogue graph.</p></div>;
  }

  const { x, y, zoom } = viewport;

  return (
    <div
      ref={containerRef}
      className="graph-canvas"
      style={{ overflow: "hidden", cursor: dragRef.current ? "grabbing" : "grab", userSelect: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div style={{ position: "absolute", transform: `translate(${x}px,${y}px) scale(${zoom})`, transformOrigin: "0 0" }}>
        {/* SVG edge layer */}
        <svg style={{ position: "absolute", inset: 0, width: 0, height: 0, overflow: "visible", pointerEvents: "none" }}>
          {edgePaths.map(e => e && (
            <path key={e.id} d={e.d} fill="none" stroke={e.stroke} strokeWidth={e.strokeWidth} />
          ))}
        </svg>
        {/* HTML node layer */}
        {posNodes.map(n => (
          <div key={n.id} style={{ position: "absolute", left: n.x, top: n.y, width: n.w }}>
            <MemoCard
              node={n.node}
              highlighted={visitedNodeIds.has(n.id)}
              selected={selectedNodeId === n.id}
              onClick={() => handleNodeClick(n.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
