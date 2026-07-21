import type {ScriptMeta} from "@sdr/shared";

interface Props {
  scripts: ScriptMeta[];
  selectedId: string;
  onSelectScript: (id: string)=> void;
  onTraverse: ()=> void;
  onOpenSettings: ()=> void;
  hasGraph: boolean;
}

function CogIcon(): JSX.Element {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

export function ControlBar({scripts, selectedId, onSelectScript, onTraverse, onOpenSettings, hasGraph}: Props): JSX.Element {
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
                    className="icon-btn"
                    onClick={onOpenSettings}
                    aria-label="Options"
                    title="Options"
        >
                    <CogIcon />
                </button>
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
