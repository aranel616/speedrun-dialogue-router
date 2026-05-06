import { Script, Context, Next } from "../types";
import { calculateDialogueLength } from "./calculateDialogueLength";
import { getNextNode } from "./getNextNode";

type Result = [number, string[], Context];
const cache = new Map<string, Result>();

export const traverse = (script:Script, nodeId:string, currentLength:number, context:Context, depth:number, visited:Set<string> = new Set()):Result => {
    const cacheKey = `${nodeId}-${JSON.stringify(context)}`;
    console.log(`${depth} - ${cacheKey}`);

    if (cache.has(cacheKey)) {
        const cacheHit = cache.get(cacheKey)!;
        return [currentLength + cacheHit[0], cacheHit[1], cacheHit[2]];
    }

    if (!nodeId) {
        return [currentLength, [], context];
    }

    if (visited.has(nodeId)) {
        return [Infinity, [], context];
    }
    const childVisited = new Set(visited);
    childVisited.add(nodeId);

    const currentNode = script[nodeId];

    if (!currentNode) {
        console.error("Node does not exist", nodeId);
    }

    let dialogueLength = 0;
    let nextNodeId:string|false;

    if ("text" in currentNode) {
        dialogueLength = calculateDialogueLength(currentNode.text);
        nextNodeId = getNextNode(script, currentNode.next, context);

        if (!nextNodeId) {
            return [currentLength + dialogueLength, [nodeId.toString()], context];
        }

        const [pathLength, path, newContext] = traverse(script, nextNodeId, currentLength + dialogueLength, context, depth + 1, childVisited);
        return [pathLength, [nodeId.toString(), ...path], newContext];
    }

    let shortestLength = Infinity;
    let shortestPath:string[] = [];
    let shortestContext:Context = context;

    for (const choice of currentNode.choices) {
        const dialogueLength = calculateDialogueLength(choice.text);
        const nextNodeId = getNextNode(script, choice.next, context);

        const choiceContext = {...context};

        if (choice.set) {
            for (const setAction of Array.isArray(choice.set) ? choice.set : [choice.set]) {
                if (setAction.type === "set") {
                    choiceContext[setAction.name] = setAction.value;
                }
              }
        }

        if (!nextNodeId) {
            if (currentLength + dialogueLength < shortestLength) {
                shortestLength = currentLength + dialogueLength;
                shortestPath = [choice.name];
                shortestContext = choiceContext;
            }
            continue;
        }

        const [pathLength, path, newContext] = traverse(script, nextNodeId, currentLength + dialogueLength, choiceContext, depth + 1, childVisited);

        if (pathLength < shortestLength) {
            shortestLength = pathLength;
            shortestPath = [choice.name, ...path];
            shortestContext = newContext;
        }
    }

    // After calculating the result, update the cache (store marginal cost, not total)
    const result:Result = [shortestLength, shortestPath, shortestContext];
    cache.set(cacheKey, [shortestLength - currentLength, shortestPath, shortestContext]);

    return result;
  }