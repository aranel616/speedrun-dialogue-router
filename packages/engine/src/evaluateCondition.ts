import {GetCondition, Context} from "./types";

export const evaluateCondition = (condition: GetCondition, context: Context): boolean => {
    const variableValue = context[condition.name];

    switch (condition.type) {
        case "eq":
            return variableValue === condition.value;
        case "ne":
            return variableValue !== condition.value;
        // Ordering comparisons treat an unset flag (undefined) as non-matching
        // rather than coercing it — a flag that was never set can't be greater
        // or less than a threshold.
        case "gt":
            return variableValue !== undefined && variableValue > condition.value;
        case "gte":
            return variableValue !== undefined && variableValue >= condition.value;
        case "lt":
            return variableValue !== undefined && variableValue < condition.value;
        case "lte":
            return variableValue !== undefined && variableValue <= condition.value;
        default:
            return false;
    }
}