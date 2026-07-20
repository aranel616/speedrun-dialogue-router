import {Context, SetCondition} from "./types";

// Apply a choice's set mutation(s) to a context, returning a NEW context (the
// input is never mutated). Shared by the engine's traversal and the graph
// package's path replay so the two can't drift on context semantics.
export function applySets(context: Context, set: SetCondition | SetCondition[] | undefined): Context {
    if (!set) {
        return context;
    }
    const next = {...context};
    for (const s of Array.isArray(set) ? set : [set]) {
        next[s.name] = s.value;
    }
    return next;
}
