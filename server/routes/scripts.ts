import { Router } from "express";
import { discoverScriptIds, loadScript } from "../lib/scriptLoader";
import { ScriptListResponse } from "../types";

const router = Router();

router.get("/", (_req, res) => {
  const ids = discoverScriptIds();
  const scripts = ids.map(id => {
    const { game, episode, script } = loadScript(id);
    return {
      id,
      game,
      episode,
      nodeCount: Object.keys(script).length,
    };
  });
  res.json({ scripts } as ScriptListResponse);
});

export default router;
