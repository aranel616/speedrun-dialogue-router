import {GetCondition, Context} from "./types";

export const evaluateCondition = (condition: GetCondition, context: Context): boolean => {
    const variableValue = context[condition.name];

    if (condition.type === "eq") { return variableValue === condition.value; }
    if (condition.type === "ne") { return variableValue !== condition.value; }

    // The remaining types are ordering comparisons, which are numeric-only: if
    // either side isn't a number (an unset flag, or a boolean/string value) the
    // condition is non-matching rather than being coerced into a nonsensical
    // comparison (e.g. "foo" > 3). The guard also narrows both to `number`.
    if (typeof variableValue !== "number" || typeof condition.value !== "number") {
        return false;
    }

    switch (condition.type) {
        case "gt":
            return variableValue > condition.value;
        case "gte":
            return variableValue >= condition.value;
        case "lt":
            return variableValue < condition.value;
        case "lte":
            return variableValue <= condition.value;
        /* istanbul ignore next -- unreachable: eq/ne return above and Next only produces these six condition types */
        default:
            return false;
    }
}