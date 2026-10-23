import express from "express";
import cors from "cors";
import roomRouter from "./routes/rooms.ts";
import scoreRouter from "./routes/scores.ts";
import { runCleanup } from "./utils/cleanup.ts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy!" });
});

app.use("/room", roomRouter);
app.use("/room", scoreRouter);

runCleanup();
setInterval(runCleanup, 60 * 60 * 1000).unref();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
