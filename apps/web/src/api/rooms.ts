import type {
  CreateRoomInput,
  GetResultsResponse,
  PlayerListItem,
  RGBColor,
  Room,
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

export async function joinRoom(roomId: string): Promise<RoomWithPlayer> {
  const res = await fetch(`${API_URL}/room/${roomId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to join room");
  }

  return res.json();
}

export async function startRoom(
  roomId: string,
  playerId: string,
): Promise<Room> {
  const res = await fetch(`${API_URL}/room/${roomId}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player_id: playerId }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to join room");
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

export async function getResults(roomId: string): Promise<GetResultsResponse> {
  const res = await fetch(`${API_URL}/room/${roomId}/results`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed get results");
  }

  return res.json();
}

export async function getRoom(roomId: string): Promise<RoomWithPlayer> {
  const res = await fetch(`${API_URL}/room/${roomId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to fetch room id");
  }

  return res.json();
}

export async function getPlayerList(roomId: string): Promise<PlayerListItem[]> {
  const res = await fetch(`${API_URL}/room/${roomId}/players`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error ?? "Failed to fetch player list");
  }

  return res.json();
}
