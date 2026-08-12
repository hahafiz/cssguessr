import db from "./../database.ts";
const query = db.prepare(
  "SELECT COUNT(DISTINCT player_id) AS player_count FROM scores WHERE room_id = ? AND (? IS NULL OR round_number = ?)",
);
