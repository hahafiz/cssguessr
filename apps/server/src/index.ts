import express from "express";
import db from "./database.ts";
import { parseRoomRow } from "./database.ts";
import roomRrouter from "./routes/rooms.ts";
import crypto from "crypto";
import { parse } from "path";

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

// insert a row to ROOMS table
const colorSequence = ["#ff0000", "#00ff00", "#0000ff"];
const colorJsonStr = JSON.stringify(colorSequence);
const roomId = crypto.randomUUID();

const insert = db.prepare(
  "INSERT INTO rooms (id, color_sequence, max_players) values (?, ?, ?)",
);

// log insert
const result = insert.run(roomId, colorJsonStr, 4);

console.log("--- INSERT SUCCESSFUL");
console.log(`Last inserted ID: ${result.lastInsertRowid}`);
console.log(`Room string ID created: ${roomId}`);
console.log(`Changes made: ${result.changes}`);

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

console.log("PARSE ROOM ROW:", parseRoomRow);
