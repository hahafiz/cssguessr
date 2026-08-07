import { DatabaseSync } from "node:sqlite";
import { RawColor, Room, RoomsRow } from "@cssguessr/shared-types";
import { formatColorSequence } from "./utils/colors";

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

  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    room_id TEXT NOT NULL,
    is_host INTEGER NOT NULL CHECK (is_host IN (0, 1)),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, room_id),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
  );
`);

export function parseRoomRow(room: RoomsRow): Room {
  const parseColor: RawColor[] = JSON.parse(room.color_sequence);
  const formattedColor = formatColorSequence(parseColor, "rgb");
  return { ...room, color_sequence: formattedColor };
}

export default db;
