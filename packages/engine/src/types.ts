export type Dialogue = string | string[];
export type Next = string | ConditionalNext;

// Which unit `traverse` minimizes: raw character count, or an estimated
// spoken-syllable count (a closer proxy for how long a line takes to say).
export type Metric = "chars" | "syllables";

export interface GetCondition {
    name: string;
    type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
    value: boolean | number | string;
    node: string;
}

export interface SetCondition {
    name: string;
    type: "set";
    value: boolean | number | string;
}

export type ConditionalNext = GetCondition[];

export type Choice = {
    name: string;
    text: Dialogue;
    set?: SetCondition | SetCondition[];
    next?: Next;
}

export interface InteractionWithChoices {
    choices: [Choice, ...Choice[]];
}

export interface InteractionWithoutChoices {
    text: Dialogue;
    next?: Next;
}

export type Interaction = InteractionWithChoices | InteractionWithoutChoices;
export type Script = {[key: string]: Interaction};

export interface Context {
    [key: string]: boolean | number | string;
}