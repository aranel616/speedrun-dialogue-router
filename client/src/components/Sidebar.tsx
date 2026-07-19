import type {GraphNode} from "../types";

interface Props {
  node: GraphNode | null;
  onClose: ()=> void;
}

function TextBlock({text}: { text: string | string[] | undefined }): JSX.Element | null {
    if (!text) {return null;}
    const lines = Array.isArray(text) ? text : [text];
    return (
        <div className="text-block">
            {lines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
    );
}

export function Sidebar({node, onClose}: Props): JSX.Element | null {
    if (!node) {return null;}

    const title = node.type === "choiceItem" ? (node.choiceName ?? node.id) : node.id;
    const badge = node.type === "choiceItem" ? "choice" : node.type;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div>
                    <span className={`node-type-badge ${badge}`}>{badge}</span>
                    <h2 className="sidebar-node-id">{title}</h2>
                </div>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="sidebar-body">
                {node.type === "linear" && <TextBlock text={node.text} />}

                {node.type === "choice" && (
                <p className="node-description">Branch point — choose an option below.</p>
        )}

                {node.type === "choiceItem" && (
                <>
                    <TextBlock text={node.text} />
                    {node.sets && node.sets.length > 0 && (
                    <div className="choice-sets" style={{marginTop: 12}}>
                        <div className="inspector-subtitle" style={{marginBottom: 6}}>Sets</div>
                        {node.sets.map((s, i) => (
                            <span key={i} className="set-badge">{s.name} = {String(s.value)}</span>
                ))}
                    </div>
            )}
                </>
        )}
            </div>
        </aside>
    );
}
