import {Handle, Position, type NodeProps} from "@xyflow/react";
import type {GraphNode} from "../../types";

export function ChoiceNode({data, selected}: NodeProps) {
    const d = data as unknown as GraphNode & { highlighted?: boolean };
    return (
        <div className={`dialogue-node choice-node${selected ? " selected" : ""}${d.highlighted ? " highlighted" : ""}`}>
            <Handle type="target" position={Position.Top} />
            <div className="node-id">{d.id}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
