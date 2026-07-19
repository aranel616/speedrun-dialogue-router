import {Script, Next, Context} from "../types";
import {evaluateCondition} from "./evaluateCondition";

export const getNextNode = (script: Script, next: Next|undefined, context: Context): string | false => {
    if (!next) {
        return false;
    }

    if (typeof next === "string") {
        return next;
    }

    for (const condition of next) {
        if (evaluateCondition(condition, context)) {
            return condition.node;
        }
    }

    console.error("No conditions matched", next, context);
    return false;
}