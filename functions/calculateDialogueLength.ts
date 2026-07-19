import {Dialogue} from "../types";

export const calculateDialogueLength = (dialogue: Dialogue): number => {
    if (typeof dialogue === "string") {
        return dialogue.length;
    } else {
        return dialogue.reduce((total, line) => total + line.length, 0);
    }
}