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

---

## Transcription Guide

This section documents how to convert game dialogue into the script data format, and how to audit the result against a reference source.

### Source Material

- Use a wiki script page (e.g. Fandom) as the authoritative reference. Save the full HTML locally.
- Run `scripts/audit_<episode>.py` (e.g. `scripts/audit_episode1.py`) to strip the HTML to plain mandatory dialogue. The audit script outputs only mandatory (non-optional) sections — anything under a heading starting with "Optional" is excluded.
- The wiki HTML path is hardcoded in the audit script as the `WIKI` constant near the top — update it to point at your saved HTML file before running.
- Always write audit/verification logic as a **Python script** in `scripts/`, not as ad-hoc bash commands. This keeps the logic inspectable and rerunnable.

### Two Node Types

**Choice node** — a point where the player must pick a line:
```typescript
"node_id": {
    "choices": [
        { "name": "Choice label", "text": "...", "set": {...}, "next": "next_node" },
        { "name": "Other choice", "text": ["line 1", "line 2"], "next": "other_node" }
    ]
}
```
- `name` is the label shown in the path output. Use the exact in-game prompt text where possible.
- `text` is the dialogue spoken by all characters during that choice branch, in order. Use an array when multiple lines are spoken sequentially.
- `set` records context flag mutations (see Context Flags below).
- `next` omitted → terminal node (end of that branch).

**Bridge node** (linear) — mandatory NPC dialogue between choices that the player cannot skip:
```typescript
"node_id_bridge": {
    "text": ["NPC line 1", "NPC line 2", "..."],
    "next": "next_node"
}
```
- `next` can be a conditional array when routing depends on a flag set earlier (see Conditional Routing).
- Name bridge nodes with a `_bridge` suffix and place them immediately after the choice node they follow.

### What Goes in Each Node's `text`

Include **every spoken line** (player and NPC) that plays during that node, in order — including:
- All character lines in the exchange
- Max's thinking monologues (voiceover, even if on-screen subtitles only)
- Mandatory puzzle narration lines that play automatically

Exclude:
- Stage directions and wiki narration (e.g. "Chloe sits on her bed.")
- Lines guarded by optional-section headers
- Conditional variant lines that only play based on flags — model those as separate choice/bridge nodes

### Modeling the Rewind Mechanic

Life is Strange's time-rewind means Max replays scenes. The correct approach is **sequential linear nodes**, not cycles:

- Each pass through a scene (first attempt, rewind, second attempt) is a separate bridge node.
- The first pass often has Max failing (trying wrong answers), the second pass has the correct path.
- This is how `jefferson_2_bridge` works: it contains the full first corridor + first bathroom + rewind + second lecture as one long linear node, because the player has no choices during that entire sequence.
- Never model a rewind as a cycle back to an earlier node — that causes the cycle-detection in `traverse` to return `Infinity`.

### Conditional Routing on Linear Nodes

When a bridge node routes to different destinations based on a prior flag, use a `ConditionalNext` array instead of a string:
```typescript
"node_bridge": {
    "text": [...],
    "next": [
        { "name": "flag_name", "type": "eq", "value": true,  "node": "node_a" },
        { "name": "flag_name", "type": "eq", "value": false, "node": "node_b" }
    ]
}
```
If no condition matches, the node becomes terminal (safe default for exhaustive flag coverage).

### Context Flags

Flags track choices that affect later dialogue. Current flags in episode1:

| Flag | Type | Set by | Affects |
|---|---|---|---|
| `reported_nathan` | boolean | wells_1 | Nathan confrontation, Chloe's question, lighthouse Chloe responses |
| `made_fun_of_victoria` | boolean | victoria_1 | Warren's opening line, Chloe's photo comment |
| `took_photo_of_kate` | boolean | kate_1 | Chloe's photo comment, lighthouse Kate discussion, David confrontation branches |

Flags propagate forward through the graph — the context is forked (spread-copied) before each choice mutation, so different branches maintain independent context states.

### Structural Conventions

- **Node naming**: `<scene>_<sequence>` for choices, `<scene>_<sequence>_bridge` for linear connectors. Number sequences (e.g. `chloe_4`, `chloe_4_bridge`, `chloe_5`) rather than using descriptive names, so insertion is easy.
- **Choice names**: use the in-game prompt text exactly (e.g. `"REPORT NATHAN"`, `"I was there..."`). For mandatory story beats framed as choices, use `"(Max initiates the conversation)"`.
- **Text quoting**: use escaped double-quotes (`\"`) inside strings, not single quotes. Single quotes in JS/TS strings are valid but cause inconsistency with JSON-style serialization.
- **Bridge placement**: always insert a bridge node between a choice node and the next choice node when the wiki shows NPC dialogue in between. Never skip this even if the bridge text is short — omitting it loses characters from the count.

### Auditing Workflow

1. Run the audit script to get plain mandatory text:
   ```bash
   python3 scripts/audit_episode1.py > /tmp/audit_output.txt
   ```
2. Read the audit output section by section. Each `=== Section Header ===` marks a new scene.
3. For each scene: identify choice points (lines that appear as two short alternatives, or lines labeled with choice names). Every choice point needs a `choices` node.
4. Between choice points: all NPC and player dialogue is mandatory and needs to be in a bridge node.
5. After transcribing, run the router and verify:
   - No `Error: node not found` (missing node reference)
   - No `Infinity` shortest path (accidental cycle)
   - The optimal path visits every major scene in story order
6. To audit choices specifically: write a Python script that extracts all `"choices"` keys from the TS file and cross-references against the audit output's choice points.

### Common Pitfalls

- **Missing bridge between two choices**: the most common omission. Always check the audit output between two player choices — if there's NPC dialogue there, it needs a bridge node.
- **Thinking monologues**: Max has frequent internal monologue lines (marked `(thinking)` in the wiki). These are voiced, count toward character total, and must be included in the appropriate node's text array.
- **Duplicate text across paths**: when multiple choice branches all lead into the same NPC response, that shared response belongs in a bridge node after the choice, not duplicated in each choice's text.
- **Single-quote vs double-quote**: always use `\"` inside text strings, not `'`. The JS parser accepts both but single quotes inside a dialogue string can be mistaken for string delimiters.
- **"Optional" sections**: the audit script excludes these automatically. Do not add optional NPC conversations (e.g. background hallway chatter) as mandatory nodes — they inflate the character count falsely.
