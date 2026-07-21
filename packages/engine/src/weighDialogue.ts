import {Dialogue, Metric} from "./types";
import {calculateDialogueLength} from "./calculateDialogueLength";
import {calculateDialogueSyllables} from "./calculateDialogueSyllables";

// Single entry point for turning a line (or lines) of dialogue into the cost
// unit a given metric routes on.
export const weighDialogue = (dialogue: Dialogue, metric: Metric): number =>
    metric === "syllables" ? calculateDialogueSyllables(dialogue) : calculateDialogueLength(dialogue);
