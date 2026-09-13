export function getStoredPlayerId(roomId: string): string | null {
  return localStorage.getItem(`player_id:${roomId}`);
}

export function storePlayerId(roomId: string, playerId: string): void {
  localStorage.setItem(`player_id:${roomId}`, playerId);
}
