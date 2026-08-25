import type { CreateRoomInput, RoomWithPlayer } from "@cssguessr/shared-types";

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
