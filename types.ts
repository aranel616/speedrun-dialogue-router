export type Dialogue = string | string[];
export type Next = string | ConditionalNext;

export interface GetCondition {
    name: string,
    type: "eq" | "gt" | "gte" | "lt" | "lte",
    value: boolean | number,
    node: string
}

export interface SetCondition {
    name: string,
    type: "set" | "add" | "subtract",
    value: boolean | number
}

export type ConditionalNext = GetCondition[];

export type Choice = {
    name: string,
    text: Dialogue,
    set?: SetCondition | SetCondition[],
    next?: Next
}

export interface InteractionWithChoices {
    choices: [Choice, ...Choice[]]
}

export interface InteractionWithoutChoices {
    text: Dialogue,
    next?: Next
}

export type Interaction = InteractionWithChoices | InteractionWithoutChoices;
export type Script = {[key: string]: Interaction};

export interface Context {
    [key: string]: boolean | number
}