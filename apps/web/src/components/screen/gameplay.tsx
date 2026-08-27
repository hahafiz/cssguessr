// TODO: gameplay screen
import { useEffect, useState } from "react";
import { createRoom } from "../../api/rooms";
import { type RoomWithPlayer } from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";

export function Gameplay() {
  const [room, setRoom] = useState<RoomWithPlayer | null>(null);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    const fetchRoom = async () => {
      const newRoom = await createRoom({ max_players: 1 });
      setRoom(newRoom);
    };
    fetchRoom();
  }, []);

  if (room === null) {
    return <p>Loading room..</p>;
  }

  const backgroundColor = room.color_sequence[currentRound - 1]; // need - 1 here because db round_number is 1-indexed

  return <ColorSwatch color={backgroundColor} />;
}
