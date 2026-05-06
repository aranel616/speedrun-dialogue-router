import express from "express";
import cors from "cors";
import path from "path";
import scriptsRouter from "./routes/scripts";
import graphRouter from "./routes/graph";
import traverseRouter from "./routes/traverse";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5175", "http://melchior:5175", "http://melchior:5173"] }));
app.use(express.json());

app.use("/api/scripts", scriptsRouter);
app.use("/api/graph", graphRouter);
app.use("/api/traverse", traverseRouter);

const clientDist = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
