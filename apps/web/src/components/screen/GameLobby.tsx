import { useParams } from "react-router";
import { Button } from "../ui/button/Button";
import { getStoredPlayerId } from "../../api/playerId";
import { useEffect, useState } from "react";
import { getRoom } from "../../api/rooms";
import type { Room } from "@cssguessr/shared-types";

export default function GameLobby() {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState("waiting");
  const { roomId } = useParams();
  const playerId = roomId ? getStoredPlayerId(roomId) : null;

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        const newRoom = await getRoom(roomId);
        setRoom(newRoom);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <>
      <Button variant="primary">Start Game</Button>
    </>
  );
}
