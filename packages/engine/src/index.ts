// Public API of the routing engine.
export {traverse} from "./traverse";
export {getNextNode} from "./getNextNode";
export {evaluateCondition} from "./evaluateCondition";
export {calculateDialogueLength} from "./calculateDialogueLength";
export type {
    Dialogue,
    Next,
    ConditionalNext,
    GetCondition,
    SetCondition,
    Choice,
    Interaction,
    InteractionWithChoices,
    InteractionWithoutChoices,
    Script,
    Context,
} from "./types";
