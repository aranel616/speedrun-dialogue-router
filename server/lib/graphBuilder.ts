import { Script } from "../../types";
import { GraphNode, GraphEdge, GraphResponse } from "../types";

export function buildGraph(scriptId: string, script: Script): GraphResponse {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  for (const [nodeId, interaction] of Object.entries(script)) {
    if ("choices" in interaction) {
      nodes.push({ id: nodeId, type: "choice", isTerminal: false });

      interaction.choices.forEach((choice, i) => {
        const ciId = `${nodeId}__ci${i}`;
        nodes.push({
          id: ciId,
          type: "choiceItem",
          choiceName: choice.name,
          text: choice.text,
          isTerminal: choice.next === undefined,
          ...(choice.set ? {
            sets: (Array.isArray(choice.set) ? choice.set : [choice.set]).map(s => ({
              name: s.name, type: s.type, value: s.value,
            })),
          } : {}),
        });

        edges.push({ id: `${nodeId}__c${i}__ci`, source: nodeId, target: ciId, edgeType: "choice" });

        if (typeof choice.next === "string") {
          edges.push({ id: `${ciId}__${choice.next}`, source: ciId, target: choice.next, edgeType: "choice" });
        } else if (Array.isArray(choice.next)) {
          choice.next.forEach((cond, j) => {
            edges.push({
              id: `${ciId}__cond${j}__${cond.node}`,
              source: ciId,
              target: cond.node,
              label: `[${cond.name} ${cond.type} ${cond.value}]`,
              edgeType: "conditional",
            });
          });
        }
      });
    } else {
      const isTerminal = interaction.next === undefined;
      nodes.push({ id: nodeId, type: "linear", text: interaction.text, isTerminal });

      if (typeof interaction.next === "string") {
        edges.push({
          id: `${nodeId}__linear__${interaction.next}`,
          source: nodeId,
          target: interaction.next,
          edgeType: "linear",
        });
      } else if (Array.isArray(interaction.next)) {
        interaction.next.forEach((cond, j) => {
          edges.push({
            id: `${nodeId}__cond${j}__${cond.node}`,
            source: nodeId,
            target: cond.node,
            label: `[${cond.name} ${cond.type} ${cond.value}]`,
            edgeType: "conditional",
          });
        });
      }
    }
  }

  return { scriptId, nodes, edges };
}
