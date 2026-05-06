import { Router, Request, Response } from "express";
import { loadScript } from "../lib/scriptLoader";
import { traverse } from "../../functions/traverse";
import { getNextNode } from "../../functions/getNextNode";
import { Script, Context } from "../../types";
import { TraverseRequest, TraverseResponse } from "../types";

const router = Router();

function computeVisitedNodeIds(
  script: Script,
  path: string[],
  startNode: string,
  initialContext: Context
): string[] {
  const visited: string[] = [];
  let nodeId: string = startNode;
  let context: Context = { ...initialContext };
  let pathIdx = 0;

  while (nodeId && pathIdx < path.length) {
    const node = script[nodeId];
    if (!node) break;

    visited.push(nodeId);

    if ("choices" in node) {
      const choiceName = path[pathIdx++];
      const choiceIdx = node.choices.findIndex(c => c.name === choiceName);
      if (choiceIdx === -1) break;
      const choice = node.choices[choiceIdx]!;
      visited.push(`${nodeId}__ci${choiceIdx}`);

      if (choice.set) {
        const sets = Array.isArray(choice.set) ? choice.set : [choice.set];
        for (const s of sets) {
          if (s.type === "set") context[s.name] = s.value;
        }
      }

      if (choice.next === undefined) break;
      const next = getNextNode(script, choice.next, context);
      if (!next) break;
      nodeId = next;
    } else {
      pathIdx++;
      if (node.next === undefined) break;
      const next = getNextNode(script, node.next, context);
      if (!next) break;
      nodeId = next;
    }
  }

  return visited;
}

router.post("/", (req: Request, res: Response) => {
  const { scriptId, startNode = "start", initialContext = {} } = req.body as TraverseRequest;

  try {
    const { script } = loadScript(scriptId);
    const [length, path, context] = traverse(script, startNode, 0, initialContext as Context, 0);
    const visitedNodeIds = computeVisitedNodeIds(script, path, startNode, initialContext as Context);
    const response: TraverseResponse = { length, path, context, visitedNodeIds };
    res.json(response);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
