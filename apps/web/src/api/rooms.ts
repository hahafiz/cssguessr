import type {
  CreateRoomInput,
  RGBColor,
  RoomWithPlayer,
  SubmitScoreResult,
} from "@cssguessr/shared-types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createRoom(
  input: CreateRoomInput,
): Promise<RoomWithPlayer> {
  const res = await fetch(`${API_URL}/room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to create room");
  }

  return res.json();
}

export async function submitScore(
  id: string,
  playerId: string,
  currentRound: number,
  guessInput: RGBColor,
): Promise<SubmitScoreResult> {
  const res = await fetch(`${API_URL}/room/${id}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player_id: playerId,
      round_number: currentRound,
      guessed_r: guessInput[0],
      guessed_g: guessInput[1],
      guessed_b: guessInput[2],
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to submit score");
  }

  return res.json();
}
