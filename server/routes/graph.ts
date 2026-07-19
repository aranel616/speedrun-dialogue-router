import {Router, Request, Response} from "express";
import {loadScript} from "../lib/scriptLoader";
import {buildGraph} from "../lib/graphBuilder";

const router = Router();

router.get("/:game/:episode", (req: Request, res: Response) => {
    const {game, episode} = req.params;
    const scriptId = `${game}/${episode}`;

    try {
        const {script} = loadScript(scriptId);
        const graph = buildGraph(scriptId, script);
        res.json(graph);
    } catch (err: unknown) {
        res.status(404).json({error: `Script not found: ${scriptId}`});
    }
});

export default router;
