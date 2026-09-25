import { useParams } from "react-router";
import { Button } from "../ui/button/Button";
import { getStoredPlayerId, storePlayerId } from "../../api/playerId";
import { useEffect, useState } from "react";
import { getRoom, joinRoom } from "../../api/rooms";
import type { Room } from "@cssguessr/shared-types";

export default function GameLobby() {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState("waiting");
  const { roomId } = useParams();
  const [playerId, setPlayerId] = useState<string | null>(() =>
    roomId ? getStoredPlayerId(roomId) : null,
  );

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        if (!playerId) {
          const newRoom = await joinRoom(roomId);
          setRoom(newRoom);
          storePlayerId(roomId, newRoom.player_id);
          setPlayerId(newRoom.player_id);
        } else {
          const newRoom = await getRoom(roomId);
          setRoom(newRoom);
        }
      }
    };
    fetchRoom();
  }, [roomId, playerId]);

  useEffect(() => {
    const interval = setInterval(() => {}, 3000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Button variant="primary">Start Game</Button>
    </>
  );
}
