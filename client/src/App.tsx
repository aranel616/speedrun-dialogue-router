import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchScripts, fetchGraph, postTraverse } from "./api";
import type { ScriptMeta, GraphResponse, GraphNode, TraverseResponse } from "./types";
import { ControlBar } from "./components/ControlBar";
import { GraphCanvas } from "./components/GraphCanvas";
import { Sidebar } from "./components/Sidebar";
import { ContextInspector } from "./components/ContextInspector";
import "./styles.css";

export default function App() {
  const [scripts, setScripts] = useState<ScriptMeta[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [graphData, setGraphData] = useState<GraphResponse | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [traversalResult, setTraversalResult] = useState<TraverseResponse | null>(null);
  const [traversing, setTraversing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchScripts().then(r => {
      setScripts(r.scripts);
      if (r.scripts.length > 0 && r.scripts[0]) {
        setSelectedId(r.scripts[0].id);
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const [game, episode] = selectedId.split("/");
    if (!game || !episode) return;
    setLoading(true);
    setGraphData(null);
    setTraversalResult(null);
    setSelectedNodeId(null);
    console.log(`[App] fetching graph for ${game}/${episode}`);
    fetchGraph(game, episode)
      .then(data => { console.log(`[App] graph received — ${data.nodes.length} nodes, ${data.edges.length} edges`); setGraphData(data); })
      .catch(console.error)
      .finally(() => { console.log(`[App] loading done`); setLoading(false); });
  }, [selectedId]);

  const handleTraverse = useCallback(async () => {
    if (!selectedId) return;
    setTraversing(true);
    try {
      const result = await postTraverse({ scriptId: selectedId });
      setTraversalResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setTraversing(false);
    }
  }, [selectedId]);

  const selectedNode: GraphNode | null = selectedNodeId && graphData
    ? graphData.nodes.find(n => n.id === selectedNodeId) ?? null
    : null;

  const visitedNodeIds = useMemo(
    () => new Set<string>(traversalResult?.visitedNodeIds ?? []),
    [traversalResult]
  );

  const cumulativeCounts = useMemo(
    () => traversalResult?.cumulativeCounts ?? {},
    [traversalResult]
  );

  return (
    <div className="app">
      <ControlBar
        scripts={scripts}
        selectedId={selectedId}
        onSelectScript={id => { setSelectedId(id); setTraversalResult(null); }}
        onTraverse={handleTraverse}
        traversing={traversing}
        hasGraph={graphData !== null}
      />

      <div className="main-area">
        {loading ? (
          <div className="canvas-empty"><p>Loading graph…</p></div>
        ) : (
          <GraphCanvas
            scriptId={selectedId}
            graphNodes={graphData?.nodes ?? []}
            graphEdges={graphData?.edges ?? []}
            visitedNodeIds={visitedNodeIds}
            selectedNodeId={selectedNodeId}
            onNodeClick={setSelectedNodeId}
            cumulativeCounts={cumulativeCounts}
          />
        )}

        <Sidebar
          node={selectedNode}
          onClose={() => setSelectedNodeId(null)}
        />
      </div>


      <ContextInspector result={traversalResult} />
    </div>
  );
}
