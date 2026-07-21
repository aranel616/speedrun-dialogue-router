// Public API of the routing engine.
export {traverse} from "./traverse";
export {getNextNode} from "./getNextNode";
export {evaluateCondition} from "./evaluateCondition";
export {calculateDialogueLength} from "./calculateDialogueLength";
export {calculateDialogueSyllables} from "./calculateDialogueSyllables";
export {weighDialogue} from "./weighDialogue";
export {applySets} from "./applySets";
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
    Metric,
} from "./types";
