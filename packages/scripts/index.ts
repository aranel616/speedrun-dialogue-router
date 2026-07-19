// Static registry of the available scripts, so a browser can enumerate and
// load them without a filesystem. Eager imports keep node counts and the
// picker trivial; if the corpus grows large, switch these to dynamic
// import() loaders for per-script code-splitting.
import type {Script} from "@sdr/engine";
import {script as lifeisstrange_episode1} from "./lifeisstrange/episode1";
import {script as lifeisstrange_episode2} from "./lifeisstrange/episode2";
import {script as lifeisstrange_episode3} from "./lifeisstrange/episode3";
import {script as lifeisstrange_episode4} from "./lifeisstrange/episode4";
import {script as lifeisstrange_episode5} from "./lifeisstrange/episode5";

export interface ScriptEntry {
  id: string;
  game: string;
  episode: string;
  script: Script;
}

export const SCRIPTS: ScriptEntry[] = [
    {id: "lifeisstrange/episode1", game: "lifeisstrange", episode: "episode1", script: lifeisstrange_episode1},
    {id: "lifeisstrange/episode2", game: "lifeisstrange", episode: "episode2", script: lifeisstrange_episode2},
    {id: "lifeisstrange/episode3", game: "lifeisstrange", episode: "episode3", script: lifeisstrange_episode3},
    {id: "lifeisstrange/episode4", game: "lifeisstrange", episode: "episode4", script: lifeisstrange_episode4},
    {id: "lifeisstrange/episode5", game: "lifeisstrange", episode: "episode5", script: lifeisstrange_episode5},
];
