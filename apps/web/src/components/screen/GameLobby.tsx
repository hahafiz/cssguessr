import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button/Button";
import {
  getStoredPlayerId,
  getStoredPublicId,
  storePlayer,
} from "../../api/playerId";
import { useEffect, useRef, useState } from "react";
import {
  getPlayerList,
  getRoom,
  joinRoom,
  renamePlayer,
  startRoom,
} from "../../api/rooms";
import {
  NAME_MAX_LENGTH,
  type PlayerListItem,
  type Room,
} from "@cssguessr/shared-types";

export default function GameLobby() {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomStatus, setRoomStatus] = useState("waiting");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [isRenameOverlayOpen, setIsRenameOverlayOpen] =
    useState<boolean>(false);
  const [savingName, setSavingName] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { roomId } = useParams();
  // local playerId
  const [playerId, setPlayerId] = useState<string | null>(() =>
    roomId ? getStoredPlayerId(roomId) : null,
  );
  const [publicId, setPublicId] = useState<string | null>(() =>
    roomId ? getStoredPublicId(roomId) : null,
  );
  // other playersId
  const [playerList, setPlayerList] = useState<PlayerListItem[]>([]);
  const navigate = useNavigate();
  const joinStarted = useRef(false);

  const currentPlayer = playerList.find((p) => p.public_id === publicId);
  const isHost = currentPlayer?.is_host === 1;

  // join room
  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        if (!playerId) {
          if (joinStarted.current) return;
          joinStarted.current = true;

          const newRoom = await joinRoom(roomId);
          setRoom(newRoom);
          storePlayer(roomId, {
            playerId: newRoom.player_id,
            publicId: newRoom.public_id,
          });
          setPlayerId(newRoom.player_id);
          setPublicId(newRoom.public_id);
        } else {
          const newRoom = await getRoom(roomId);
          setRoom(newRoom);
        }
      }
    };
    fetchRoom().catch((err) => {
      console.error("Failed to load lobby: ", err);
      joinStarted.current = false;
      setJoinError(err instanceof Error ? err.message : "Could not join room");
    });
  }, [roomId, playerId]);

  // polling - all players will call this function to BE
  useEffect(() => {
    const fetchGame = async () => {
      if (!roomId) return;
      const playersList = await getPlayerList(roomId);
      setPlayerList(playersList);
      const room = await getRoom(roomId);
      setRoomStatus(room.status);
    };
    const poll = () =>
      fetchGame().catch((err) => console.error("Lobby poll failed: ", err));
    poll();
    const interval = setInterval(poll, 3000);

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
    if (roomId && playerId) {
      await startRoom(roomId, playerId);
    }
  };

  const openOverlay = () => {
    setError("");
    setIsRenameOverlayOpen(true);
    setPlayerName(currentPlayer?.name ?? "");
  };

  const closeOverlay = () => {
    setIsRenameOverlayOpen(false);
    setError("");
  };

  const onSaveName = async () => {
    const trimmed = playerName.trim();
    if (!trimmed) {
      setError("Name can't be empty");
      return;
    }

    setError("");
    setSavingName(true);

    try {
      if (roomId && playerId) {
        await renamePlayer(roomId, playerId, trimmed);
        setIsRenameOverlayOpen(false);

        // show the new name now instead of waiting for the next poll
        getPlayerList(roomId).then(setPlayerList).catch(console.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not rename");
    } finally {
      setSavingName(false);
    }
  };

  if (joinError) {
    return <p className="text-white">{joinError}</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full gap-4 p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
        <div className="text-white">
          Invite your friends: {window.location.href}
        </div>
        <div className="text-white">Max players: {room?.max_players}</div>
        <div className="flex flex-col gap-4 text-white">
          <h3>Players</h3>
          {playerList.map((p) => (
            <div key={p.public_id} className="flex gap-2 items-center">
              <p>{p.name}</p>
              {p.public_id === publicId && <span>YOU</span>}
              {p.is_host === 1 && <strong>HOST</strong>}
              {p.public_id === publicId && (
                <Button variant="outline" onClick={openOverlay}>
                  Rename
                </Button>
              )}
            </div>
          ))}
        </div>
        {isHost ? (
          <Button variant="primary" onClick={onStart}>
            Start Game
          </Button>
        ) : (
          <p className="text-white">Waiting for host to start</p>
        )}

        {isRenameOverlayOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeOverlay}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Rename player"
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-md flex-col gap-3 rounded-lg bg-white p-6 shadow-xl"
            >
              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
                  {error}
                </p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={NAME_MAX_LENGTH}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="min-w-0 flex-1 rounded-md bg-slate-200 py-1 px-2 text-black"
                  autoFocus
                />
                <Button
                  variant="primary"
                  onClick={onSaveName}
                  disabled={savingName}
                >
                  {savingName ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
