# speedrun-dialogue-router

Finds the **shortest path** — by total character count — through a branching
narrative dialogue script, and renders the whole graph so you can see the route.
Built to analyze *Life is Strange* for speedrun route analysis and narrative
structure verification.

Given a script modelled as a graph of dialogue nodes (linear lines and player
choice points, with flags that gate later branches), the engine does a memoized
depth-first search for the branch sequence that speaks the fewest characters,
then the web app visualizes the graph with that route highlighted.

## Quick start

```bash
npm install
npm run dev      # start the web app (Vite) at the printed localhost URL
```

Pick a script from the dropdown to render its graph, then **Find Shortest Path**
to highlight the minimal route and show the running character count per node.

## Repository layout

This is an npm-workspaces monorepo. Everything runs in the browser — there is no
backend.

| Workspace | Package | Responsibility |
|---|---|---|
| `packages/engine` | `@sdr/engine` | Pure routing engine: the DFS pathfinder, condition evaluation, dialogue length. |
| `packages/graph` | `@sdr/graph` | Turns a script into a view graph (`buildGraph`) and replays a traversal (`runTraverse`). |
| `packages/scripts` | `@sdr/scripts` | The transcribed dialogue data and the `SCRIPTS` registry. |
| `packages/shared` | `@sdr/shared` | View/response types shared across packages and the app. |
| `apps/web` | `@sdr/web` | React + Vite single-page app: graph canvas, minimap, table of contents, context inspector. |
| `tools/transcription` | — | Python helpers for transcribing and auditing dialogue against a wiki source. |

## How routing works

- A **script** is a map of node id → node. A node is either linear
  (`{ text, next? }`) or a choice point (`{ choices: [...] }`).
- `traverse` walks the graph depth-first, trying every branch of each choice and
  keeping the cheapest. Choices can carry `set` mutations that fork an immutable
  `context` of flags, so branches gated on earlier decisions route correctly.
- Results are memoized per script (keyed on node id + context) as marginal cost,
  and a visited-set guard prunes cycles. See the soundness note in
  `packages/engine/src/traverse.ts` for the caveat on that memoization.

## Scripts

```bash
npm run dev         # web app in dev mode
npm run build       # typecheck + production build of the web app
npm run lint        # ESLint across every workspace (zero warnings allowed)
npm run typecheck   # project-wide tsc --noEmit
npm test            # engine/graph/scripts tests (Jest) with coverage
npm run test:web    # web app tests (Vitest) with coverage
npm run test:all    # both test suites
```

Both test suites enforce **100% coverage**. Genuinely-unreachable defensive
guards are annotated with an ignore directive and a justification rather than
being left uncovered.

## Adding a script

1. Create `packages/scripts/<game>/episodeN.ts` exporting a `Script` object.
2. Register it in `packages/scripts/index.ts` (add a `SCRIPTS` entry).
3. Run the router / open the app and verify there are no missing-node errors and
   no accidental `Infinity` path (an unintended cycle).

See [`CLAUDE.md`](./CLAUDE.md) for the full transcription and auditing guide,
including how mandatory dialogue is extracted from a wiki source and how the
rewind mechanic is modelled.

## A note on the dialogue data

The transcribed dialogue is included for analysis and structural verification.
*Life is Strange* and its script are the property of their respective owners;
this project is an unofficial, non-commercial fan tool and is not affiliated with
or endorsed by them.
