# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Does

A dialogue routing engine that finds the **shortest path** (by total character count) through a branching narrative script. Originally built to analyze *Life is Strange* Episode 1 — useful for speedrun route analysis or narrative structure verification.

## Running the Code

No `package.json` exists. Run directly with `ts-node`:

```bash
ts-node run.ts
```

Or compile then run:

```bash
tsc && node run.js
```

Output: shortest dialogue length (chars), the ordered path of choice/node names taken, final context state, and execution time.

## Architecture

### Core Algorithm (`functions/traverse.ts`)

Recursive depth-first search over the script graph. Signature:

```
traverse(script, nodeId, currentLength, context, depth) → [totalLength, path[], finalContext]
```

- **Choice nodes** (`InteractionWithChoices`): tries all branches, returns the shortest. Each choice may carry `set` mutations that fork the `context` immutably before recursing.
- **Linear nodes** (`InteractionWithoutChoices`): follows `next`, which is either a node ID string or a `ConditionalNext` array evaluated by `getNextNode`.
- **Memoization**: cache is keyed on `${nodeId}-${JSON.stringify(context)}`. Cache writes are active but cache reads are currently disabled (the `return cacheHit` line is commented out in `traverse.ts:18`). Re-enable to speed up repeated traversals with shared context states.

### Type System (`types.ts`)

- `Next = string | ConditionalNext` — a node ID or an array of `GetCondition` (first matching condition wins, evaluated by `getNextNode`).
- `SetCondition` supports `set | add | subtract`, but only `"set"` is currently applied in `traverse.ts`. `add`/`subtract` are parsed but ignored.
- `Context` is a flat `{[name]: boolean | number}` map passed immutably (spread-copied before mutations).

### Adding a New Script

Create a file under `scripts/<game>/episodeN.ts` exporting a `Script` object, then update the import in `run.ts`. Each key in the `Script` map is a node ID. A node is either:

- `{ text, next? }` — linear dialogue
- `{ choices: [{ name, text, set?, next? }] }` — branching choice point

`next` on a choice can be omitted to mark it as a terminal (end-of-script) path.
