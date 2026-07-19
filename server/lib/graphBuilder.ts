import {Script, GetCondition} from "../../types";
import {GraphNode, GraphEdge, GraphResponse} from "../types";

const OP: Record<string, string> = {eq: "=", ne: "≠", gt: ">", gte: "≥", lt: "<", lte: "≤"};

// Full "name op value" — used for the fallback (mixed-variable) fork display.
function condLabel(c: GetCondition): string {
    return `${c.name} ${OP[c.type] ?? c.type} ${c.value}`;
}

// Just the value part — the branch/edge label under a single-variable fork.
// For eq this is the bare value ("true"); otherwise it keeps the operator ("> 3").
function valueLabel(c: GetCondition): string {
    return c.type === "eq" ? String(c.value) : `${OP[c.type] ?? c.type} ${c.value}`;
}

// A fork is "single-variable" when every branch tests the same flag, so it can be
// drawn as one node (the variable) with value-labelled edges. Exported so the
// traverse route derives the same condition node id for path highlighting.
export function isSingleVariableFork(conds: GetCondition[]): boolean {
    return conds.length > 0 && conds.every((c) => c.name === conds[0]!.name);
}

export function buildGraph(scriptId: string, script: Script): GraphResponse {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    // Render a ConditionalNext as a decision hop between the source and its targets.
    //  - single variable: one node naming the flag, edges labelled with each value
    //      source ─► [took_photo_of_kate] ──true──► nodeA
    //                                      ──false─► nodeB
    //  - mixed variables (fallback): one node per branch labelled "name op value".
    function emitConditional(sourceId: string, conds: GetCondition[]) {
        if (isSingleVariableFork(conds)) {
            const condId = `${sourceId}__cond`;
            nodes.push({id: condId, type: "conditionItem", condition: conds[0]!.name, isTerminal: false});
            edges.push({id: `${sourceId}__toc`, source: sourceId, target: condId, edgeType: "conditional"});
            conds.forEach((cond, j) => {
                edges.push({
                    id: `${condId}__${j}__${cond.node}`,
                    source: condId,
                    target: cond.node,
                    label: valueLabel(cond),
                    edgeType: "conditional",
                });
            });
        } else {
            conds.forEach((cond, j) => {
                const condId = `${sourceId}__cond${j}`;
                nodes.push({id: condId, type: "conditionItem", condition: condLabel(cond), isTerminal: false});
                edges.push({id: `${sourceId}__toc${j}`, source: sourceId, target: condId, edgeType: "conditional"});
                edges.push({id: `${condId}__${cond.node}`, source: condId, target: cond.node, edgeType: "conditional"});
            });
        }
    }

    for (const [nodeId, interaction] of Object.entries(script)) {
        if ("choices" in interaction) {
            nodes.push({id: nodeId, type: "choice", isTerminal: false});

            interaction.choices.forEach((choice, i) => {
                const ciId = `${nodeId}__ci${i}`;
                nodes.push({
                    id: ciId,
                    type: "choiceItem",
                    choiceName: choice.name,
                    text: choice.text,
                    isTerminal: choice.next === undefined,
                    ...(choice.set ? {
                        sets: (Array.isArray(choice.set) ? choice.set : [choice.set]).map((s) => ({
                            name: s.name, type: s.type, value: s.value,
                        })),
                    } : {}),
                });

                edges.push({id: `${nodeId}__c${i}__ci`, source: nodeId, target: ciId, edgeType: "choice"});

                if (typeof choice.next === "string") {
                    edges.push({id: `${ciId}__${choice.next}`, source: ciId, target: choice.next, edgeType: "choice"});
                } else if (Array.isArray(choice.next)) {
                    emitConditional(ciId, choice.next);
                }
            });
        } else {
            const isTerminal = interaction.next === undefined;
            nodes.push({id: nodeId, type: "linear", text: interaction.text, isTerminal});

            if (typeof interaction.next === "string") {
                edges.push({
                    id: `${nodeId}__linear__${interaction.next}`,
                    source: nodeId,
                    target: interaction.next,
                    edgeType: "linear",
                });
            } else if (Array.isArray(interaction.next)) {
                emitConditional(nodeId, interaction.next);
            }
        }
    }

    return {scriptId, nodes, edges};
}
