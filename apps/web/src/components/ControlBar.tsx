import type {ScriptMeta} from "@sdr/shared";

interface Props {
  scripts: ScriptMeta[];
  selectedId: string;
  onSelectScript: (id: string)=> void;
  onTraverse: ()=> void;
  hasGraph: boolean;
}

export function ControlBar({scripts, selectedId, onSelectScript, onTraverse, hasGraph}: Props): JSX.Element {
    return (
        <header className="control-bar">
            <div className="control-bar-left">
                <span className="app-title">Dialogue Router</span>
                <select
                    className="script-select"
                    value={selectedId}
                    onChange={(e) => onSelectScript(e.target.value)}
        >
                    {/* Placeholder for the brief pre-selection state; not a
                        re-selectable choice (disabled), and kept out of the
                        open dropdown (hidden) so it can't be picked back. */}
                    <option value="" disabled hidden>— select a script —</option>
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
                    disabled={!hasGraph}
        >
                    Find Shortest Path
                </button>
            </div>
        </header>
    );
}
