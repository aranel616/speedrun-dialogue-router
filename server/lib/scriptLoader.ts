import * as fs from "fs";
import * as path from "path";
import {Script} from "../../types";

const SCRIPTS_DIR = path.resolve(__dirname, "../../scripts");

export interface LoadedScript {
  id: string;
  game: string;
  episode: string;
  script: Script;
}

export function discoverScriptIds(): string[] {
    const seen = new Set<string>();

    for (const game of fs.readdirSync(SCRIPTS_DIR)) {
        const gamePath = path.join(SCRIPTS_DIR, game);
        if (!fs.statSync(gamePath).isDirectory()) {continue;}

        for (const file of fs.readdirSync(gamePath)) {
            let base: string | null = null;
            if (file.endsWith(".d.ts")) {continue;}
            if (file.endsWith(".ts")) {base = path.basename(file, ".ts");}
            else if (file.endsWith(".js")) {base = path.basename(file, ".js");}
            if (!base) {continue;}

            const id = `${game}/${base}`;
            if (!seen.has(id)) {seen.add(id);}
        }
    }

    return Array.from(seen);
}

export function loadScript(id: string): LoadedScript {
    const parts = id.split("/");
    const game = parts[0]!;
    const episode = parts[1]!;
    const modulePath = path.join(SCRIPTS_DIR, game, episode);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(modulePath) as { script: Script };
    return {id, game, episode, script: mod.script};
}
