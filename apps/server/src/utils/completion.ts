// TO CHECK IF THE ROUND OR GAME IS COMPLETED BY ALL PLAYERS

import db from "./../database.ts";

// find how many submitted scores done by different player_id for this room_id
const scoreCountQuery = db.prepare(
  "SELECT COUNT(DISTINCT player_id) AS player_count FROM scores WHERE room_id = ? AND (? IS NULL OR round_number = ?)",
);

export function getSubmittedPlayerCount(
  room_id: string,
  round_number: number | null = null,
): number {
  const result = scoreCountQuery.get(room_id, round_number, round_number) as
    | { player_count: number }
    | undefined;

  return result?.player_count ?? 0;
}
