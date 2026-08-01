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

// get all table list
const query = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
console.log("DATABASE: ", query.all());

// log all rows
const rowQuery = db.prepare("SELECT * FROM rooms");
const allRow = rowQuery.all();

console.log("--- ALL ROOMS ---");
allRow.forEach((room: any) => {
  const colors = JSON.parse(room.color_sequence);

  console.log(`Room ID: ${room.id}`);
  console.log(`Max_players: ${room.max_players}`);
  console.log(`Colors: ${room.color_sequence}`);
  console.log(`Status: ${room.status}`);
  console.log("----------------------");
});
