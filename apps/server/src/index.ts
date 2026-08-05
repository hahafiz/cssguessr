import express from "express";
import db from "./database.ts";
import roomRrouter from "./routes/rooms.ts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy!" });
});

app.use("/room", roomRrouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
