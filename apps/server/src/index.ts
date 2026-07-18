import express from "express";
import db from "./database.ts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const query = db.prepare("SELECT color_sequence FROM rooms");
console.log("DATABASE: ", query.all());
