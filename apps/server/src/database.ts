import { DatabaseSync } from "node:sqlite";
import { RoomsRow } from "../../../packages/shared-types";

const db = new DatabaseSync("./data/cssguessr.db");

db.exec(`
  PRAGMA foreign_keys = ON;
  
  CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    color_sequence TEXT NOT NULL,
    max_players INTEGER DEFAULT 2,
    status TEXT CHECK(status IN ('waiting', 'active', 'expired')) DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    player_id TEXT NOT NULL,
    round_number INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
  );
  `);

export function parseRoomRow(room: RoomsRow) {
  return JSON.parse(room.color_sequence);
}

export default db;
