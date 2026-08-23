import db from "../database";

export const getRoomId = db.prepare("SELECT * FROM rooms WHERE id = ?");

export const insertQuery = db.prepare(
  `INSERT INTO scores (room_id, player_id, round_number, score) VALUES (?, ?, ?, ?)`,
);
export const getPlayerScore = db.prepare(
  "SELECT player_id, score FROM scores WHERE room_id = ? AND round_number = ?",
);
export const getPlayerFinalScore = db.prepare(
  "SELECT player_id, SUM(score) AS total_score FROM scores WHERE room_id = ? GROUP BY player_id",
);

export const getPlayerWithRoom = db.prepare(
  "SELECT players.is_host, rooms.id, rooms.color_sequence, rooms.max_players, rooms.status, rooms.started_at, rooms.created_at FROM players JOIN rooms ON players.room_id = rooms.id WHERE players.room_id = ? AND players.player_id = ?",
);
export const insertRoom = db.prepare(
  "INSERT INTO rooms (id, color_sequence, max_players) values (?, ?, ?)",
);
export const insertPlayer = db.prepare(
  "INSERT INTO players (player_id, room_id, is_host) values (?, ?, ?)",
);

export const roomCapacity = db.prepare(
  "SELECT COUNT(*) as count FROM players WHERE room_id = ?",
);

export const changeRoomStatus = db.prepare(
  "UPDATE rooms SET status = ?, started_at = CURRENT_TIMESTAMP WHERE id = ?",
);

// completion.ts
// find how many submitted scores done by different player_id for this room_id
export const scoreCountQuery = db.prepare(
  "SELECT COUNT(DISTINCT player_id) AS player_count FROM scores WHERE room_id = ? AND (? IS NULL OR round_number = ?)",
);

export const playerCountQuery = db.prepare(
  "SELECT COUNT(*) as count FROM players WHERE room_id = ?",
);
