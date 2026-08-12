import db from "./../database.ts";

// find how many submitted scores done by different player_id for this room_id
const scoreCountQuery = db.prepare(
  "SELECT COUNT(DISTINCT player_id) AS player_countFROM scores WHERE room_id = ? AND (? IS NULL OR round_number = ?)",
);

const room_id = "test";
const round_number = 2;

// for a specific round:
scoreCountQuery.get(room_id, round_number, round_number);

// for whole game:
scoreCountQuery.get(room_id, null, null);
