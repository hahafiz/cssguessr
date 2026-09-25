import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button/Button";
import { getStoredPlayerId, storePlayerId } from "../../api/playerId";
import { useEffect, useState } from "react";
import { getPlayerList, getRoom, joinRoom } from "../../api/rooms";
import type { PlayerListItem, Room } from "@cssguessr/shared-types";

export default function GameLobby() {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState("waiting");
  const { roomId } = useParams();
  const [playerId, setPlayerId] = useState<string | null>(() =>
    roomId ? getStoredPlayerId(roomId) : null,
  );
  const [playerList, setPlayerList] = useState<PlayerListItem[]>([]);
  const navigate = useNavigate();

  // join room
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

  // polling - all players will call this function to BE
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchGame = async () => {
        if (roomId) {
          const playersList = await getPlayerList(roomId);
          setPlayerList(playersList);
          const room = await getRoom(roomId);
          setRoomStatus(room.status);
        }
      };
      fetchGame();
    }, 3000);

    return () => clearInterval(interval);
  }, [roomId]);

  // navigate once the room status is set to active
  useEffect(() => {
    if (roomStatus == "active") {
      navigate("/room/" + roomId);
    }
  }, [roomStatus, roomId, navigate]);

  return (
    <>
      <Button variant="primary">Start Game</Button>
    </>
  );
}
