import {Handle, Position, type NodeProps} from "@xyflow/react";
import type {GraphNode} from "@sdr/shared";

function preview(text: string | string[] | undefined): string {
    const first = Array.isArray(text) ? text[0] : text;
    if (!first) {return "";}
    return first.length > 44 ? first.slice(0, 41) + "…" : first;
}

export function ChoiceItemNode({data, selected}: NodeProps): JSX.Element {
    const d = data as unknown as GraphNode & { highlighted?: boolean };
    return (
        <div className={`choice-item-node${selected ? " selected" : ""}${d.highlighted ? " highlighted" : ""}${d.isTerminal ? " terminal" : ""}`}>
            <Handle type="target" position={Position.Top} />
            <div className="ci-name">{d.choiceName}</div>
            {d.text && <div className="ci-preview">{preview(d.text)}</div>}
            {d.sets && d.sets.length > 0 && (
            <div className="ci-sets">
                {d.sets.map((s, i) => (
                    <span key={i} className="set-badge">{s.name}={String(s.value)}</span>
          ))}
            </div>
      )}
            {!d.isTerminal && <Handle type="source" position={Position.Bottom} />}
        </div>
    );
}
