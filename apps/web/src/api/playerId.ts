import type { StoredPlayer } from "@cssguessr/shared-types";

const key = (roomId: string) => `player:${roomId}`;

export function getStoredPlayer(roomId: string): StoredPlayer | null {
  const raw = localStorage.getItem(key(roomId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.playerId === "string" &&
      typeof parsed?.publicId === "string"
    ) {
      return parsed as StoredPlayer;
    }
  } catch {
    console.warn("Corrupted player data, clearing", roomId);
    localStorage.removeItem(key(roomId));
  }
  return null;
}

export function storePlayer(roomId: string, player: StoredPlayer): void {
  localStorage.setItem(key(roomId), JSON.stringify(player));
}

export function getStoredPlayerId(roomId: string): string | null {
  return getStoredPlayer(roomId)?.playerId ?? null;
}

export function getStoredPublicId(roomId: string): string | null {
  return getStoredPlayer(roomId)?.publicId ?? null;
}
