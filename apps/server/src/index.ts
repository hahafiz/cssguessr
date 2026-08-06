import express from "express";
import roomRouter from "./routes/rooms.ts";
import scoreRouter from "./routes/scores.ts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy!" });
});

app.use("/room", roomRouter);
app.use("/room", scoreRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
