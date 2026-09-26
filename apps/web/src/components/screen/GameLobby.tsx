import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button/Button";
import { getStoredPlayerId, storePlayerId } from "../../api/playerId";
import { useEffect, useState } from "react";
import { getPlayerList, getRoom, joinRoom, startRoom } from "../../api/rooms";
import type { PlayerListItem, Room } from "@cssguessr/shared-types";

export default function GameLobby() {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState("waiting");
  const { roomId } = useParams();
  // local playerId
  const [playerId, setPlayerId] = useState<string | null>(() =>
    roomId ? getStoredPlayerId(roomId) : null,
  );
  // other playersId
  const [playerList, setPlayerList] = useState<PlayerListItem[]>([]);
  const navigate = useNavigate();

  const currentPlayer = playerList.find((p) => p.player_id === playerId);
  const isHost = currentPlayer?.is_host === 1;

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

  // flip room status to "active"
  const onStart = async () => {
    if (roomId) {
      await startRoom(roomId);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>Invite your friends: ${window.location.href}</div>
        <div>Room status: ${room?.max_players}</div>
        <div className="flex flex-col gap-4">
          <h3>Players</h3>
          {playerList.map((p) => (
            <div className="flex gap-2">
              <p>{p.player_id}</p>
              {p.is_host && <strong>HOST</strong>}
            </div>
          ))}
        </div>
        {isHost ? (
          <Button variant="primary" onClick={onStart}>
            Start Game
          </Button>
        ) : (
          <p>Waiting for host to start</p>
        )}
      </div>
    </>
  );
}
