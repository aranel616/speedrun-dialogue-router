import type {ScriptMeta} from "../types";

interface Props {
  scripts: ScriptMeta[];
  selectedId: string;
  onSelectScript: (id: string)=> void;
  onTraverse: ()=> void;
  traversing: boolean;
  hasGraph: boolean;
}

export function ControlBar({scripts, selectedId, onSelectScript, onTraverse, traversing, hasGraph}: Props): JSX.Element {
    return (
        <header className="control-bar">
            <div className="control-bar-left">
                <span className="app-title">Dialogue Router</span>
                <select
                    className="script-select"
                    value={selectedId}
                    onChange={(e) => onSelectScript(e.target.value)}
        >
                    <option value="">— select a script —</option>
                    {scripts.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.game} / {s.episode} ({s.nodeCount} nodes)
                        </option>
          ))}
                </select>
            </div>

            <div className="control-bar-right">
                <button
                    className="traverse-btn"
                    onClick={onTraverse}
                    disabled={!hasGraph || traversing}
        >
                    {traversing ? "Finding…" : "Find Shortest Path"}
                </button>
            </div>
        </header>
    );
}
