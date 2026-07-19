import {Router, Request, Response} from "express";
import {loadScript} from "../lib/scriptLoader";
import {runTraverse} from "@sdr/graph";
import {Context} from "@sdr/engine";
import {TraverseRequest} from "@sdr/shared";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const {scriptId, startNode = "start", initialContext = {}} = req.body as TraverseRequest;

    try {
        const {script} = loadScript(scriptId);
        res.json(runTraverse(script, startNode, initialContext as Context));
    } catch (err: unknown) {
        res.status(500).json({error: (err as Error).message});
    }
});

export default router;
