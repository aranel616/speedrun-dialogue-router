import {useState, useEffect, useCallback, useMemo} from "react";
import {listScripts, getGraph, getShortestPath} from "./api";
import type {ScriptMeta, GraphResponse, GraphNode, TraverseResponse} from "@sdr/shared";
import {ControlBar} from "./components/ControlBar";
import {GraphCanvas} from "./components/GraphCanvas";
import {Sidebar} from "./components/Sidebar";
import {ContextInspector} from "./components/ContextInspector";
import "./styles.css";

export default function App(): JSX.Element {
    const [scripts, setScripts] = useState<ScriptMeta[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [graphData, setGraphData] = useState<GraphResponse | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [traversalResult, setTraversalResult] = useState<TraverseResponse | null>(null);

    useEffect(() => {
        const {scripts: list} = listScripts();
        setScripts(list);
        if (list.length > 0 && list[0]) {
            setSelectedId(list[0].id);
        }
    }, []);

    useEffect(() => {
        if (!selectedId) {return;}
        const [game, episode] = selectedId.split("/");
        if (!game || !episode) {return;}
        setTraversalResult(null);
        setSelectedNodeId(null);
        setGraphData(getGraph(game, episode));
    }, [selectedId]);

    const handleTraverse = useCallback(() => {
        /* v8 ignore next -- defensive: the traverse button is disabled without a loaded graph (hence a selection) */
        if (!selectedId) {return;}
        setTraversalResult(getShortestPath({scriptId: selectedId}));
    }, [selectedId]);

    const selectedNode: GraphNode | null = selectedNodeId && graphData
        ? graphData.nodes.find((n) => n.id === selectedNodeId) ?? null
        : null;

    const visitedNodeIds = useMemo(
        () => new Set<string>(traversalResult?.visitedNodeIds ?? []),
        [traversalResult],
    );

    const cumulativeCounts = useMemo(
        () => traversalResult?.cumulativeCounts ?? {},
        [traversalResult],
    );

    return (
        <div className="app">
            <ControlBar
                scripts={scripts}
                selectedId={selectedId}
                onSelectScript={(id) => { setSelectedId(id); setTraversalResult(null); }}
                onTraverse={handleTraverse}
                hasGraph={graphData !== null}
            />

            <div className="main-area">
                <GraphCanvas
                    scriptId={selectedId}
                    graphNodes={graphData?.nodes ?? []}
                    graphEdges={graphData?.edges ?? []}
                    visitedNodeIds={visitedNodeIds}
                    selectedNodeId={selectedNodeId}
                    onNodeClick={setSelectedNodeId}
                    cumulativeCounts={cumulativeCounts}
                />

                <Sidebar
                    node={selectedNode}
                    onClose={() => setSelectedNodeId(null)}
                />
            </div>

            <ContextInspector result={traversalResult} />
        </div>
    );
}
