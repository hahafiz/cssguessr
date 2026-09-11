import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { RoomWithPlayer } from "@cssguessr/shared-types";
import { createRoom } from "../../api/rooms";

export default function GameOptions() {
  const [room, setRoom] = useState<RoomWithPlayer | null>(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    const fetchRoom = async () => {
      const newRoom = await createRoom({ max_players: 1 });
      setRoom(newRoom);
    };
    fetchRoom();
  }, []);
  return <>Test</>;
}
