import type { CreateRoomInput, RoomWithPlayer } from "@cssguessr/shared-types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createRoom(
  input: CreateRoomInput,
): Promise<RoomWithPlayer> {
  const res = await fetch(`${API_URL}/room`, {});

  return res.json();
}
