import {Handle, Position, type NodeProps} from "@xyflow/react";
import type {GraphNode} from "@sdr/shared";

function textPreview(text: string | string[] | undefined): string {
    if (!text) {return "(no text)";}
    const first = Array.isArray(text) ? text[0] : text;
    if (!first) {return "(no text)";}
    return first.length > 50 ? first.slice(0, 47) + "…" : first;
}

export function LinearNode({data, selected}: NodeProps): JSX.Element {
    const d = data as unknown as GraphNode & { highlighted?: boolean };
    return (
        <div className={`dialogue-node linear-node${selected ? " selected" : ""}${d.highlighted ? " highlighted" : ""}${d.isTerminal ? " terminal" : ""}`}>
            {!d.isTerminal && <Handle type="target" position={Position.Top} />}
            <div className="node-id">{d.id}</div>
            <div className="node-preview">{textPreview(d.text)}</div>
            {!d.isTerminal && <Handle type="source" position={Position.Bottom} />}
        </div>
    );
}
