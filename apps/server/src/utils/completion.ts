// TO CHECK IF THE ROUND OR GAME IS COMPLETED BY ALL PLAYERS

import db from "./../database.ts";
import {
  SEQUENCE_LENGTH,
  ROUND_DURATION_MS,
  REVEAL_DURATION_MS,
} from "@cssguessr/shared-types";
import { scoreCountQuery, playerCountQuery } from "./queries.ts";

const ROUND_CYCLE_MS = ROUND_DURATION_MS + REVEAL_DURATION_MS;

function toMs(startedAt: string | null): number | null {
  return startedAt
    ? new Date(startedAt.replace(" ", "T") + "Z").getTime()
    : null;
}

// guessing window of this round has closed
export function hasRoundEnded(
  startedAt: string | null,
  round: number,
  now = Date.now(),
): boolean {
  const start = toMs(startedAt);
  if (start === null) return false;
  return now >= start + (round - 1) * ROUND_CYCLE_MS + ROUND_DURATION_MS;
}

export function hasGameEnded(
  startedAt: string | null,
  now = Date.now(),
): boolean {
  const start = toMs(startedAt);
  if (start === null) return false;
  return now >= start + SEQUENCE_LENGTH + ROUND_CYCLE_MS;
}

// how many distinct player in this room have submitted a score
export function getSubmittedPlayerCount(
  room_id: string,
  round_number: number | null = null,
): number {
  const result = scoreCountQuery.get(room_id, round_number, round_number) as
    | { player_count: number }
    | undefined;

  return result?.player_count ?? 0;
}

// how many players have actually joined this room
export function getPlayerCount(room_id: string): number {
  const result = playerCountQuery.get(room_id) as { count: number } | undefined;

  return result?.count ?? 0;
}

// has every player in the room submitted a score for this specific round?
export function isRoundComplete(
  room_id: string,
  round_number: number | null = null,
): boolean {
  const submitted = getSubmittedPlayerCount(room_id, round_number);
  const totalPlayers = getPlayerCount(room_id);

  return totalPlayers > 0 && submitted === totalPlayers;
}

// has every player submitted scores for every round?
// since the round is sequential, check the last round (SEQUENCE_LENGTH)
// last round complete = game complete
export function isGameComplete(room_id: string): boolean {
  return isRoundComplete(room_id, SEQUENCE_LENGTH);
}
