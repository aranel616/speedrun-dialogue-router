import {Dialogue} from "./types";

// Rule-based English syllable estimate for a single word (already lower-cased,
// letters only, and non-empty — see the [a-z]+ match in countLineSyllables).
// Vowel-group counting is the standard heuristic: count runs of vowels, drop
// a trailing silent "e", and never go below one syllable per word.
const countWordSyllables = (word: string): number => {
    if (word.length <= 3) {
        return 1;
    }

    // Strip a trailing silent "e" (but not "le", where the e is voiced, e.g. "settle").
    const trimmed = word.endsWith("e") && !word.endsWith("le") ? word.slice(0, -1) : word;

    const vowelGroups = trimmed.match(/[aeiouy]+/g);
    return vowelGroups ? Math.max(1, vowelGroups.length) : 1;
};

const countLineSyllables = (line: string): number => {
    const words = line.toLowerCase().match(/[a-z]+/g);
    if (!words) {
        return 0;
    }
    return words.reduce((total, word) => total + countWordSyllables(word), 0);
};

export const calculateDialogueSyllables = (dialogue: Dialogue): number => {
    if (typeof dialogue === "string") {
        return countLineSyllables(dialogue);
    }
    return dialogue.reduce((total, line) => total + countLineSyllables(line), 0);
};
