import { GetCondition, Context } from "../types";

export const evaluateCondition = (condition:GetCondition, context:Context):boolean => {
    const variableValue = context[condition.name];
  
    switch (condition.type) {
        case "eq":
            return variableValue === condition.value;
        case "gt":
            return variableValue > condition.value;
        case "gte":
            return variableValue >= condition.value;
        case "lt":
            return variableValue < condition.value;
        case "lte":
            return variableValue <= condition.value;
        default:
            return false;
    }
  }