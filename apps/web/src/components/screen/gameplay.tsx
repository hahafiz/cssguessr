// TODO: gameplay screen
import { useEffect, useState } from "react";
// import { type GameState } from "../../../../../packages/shared-types/game";
import { generateRandomHex } from "../../lib/color-generator";
import { createRoom } from "../../api/rooms";
import type { CreateRoomInput } from "@cssguessr/shared-types";

export function Gameplay({ user, color, score, round }: GameState) {
  const [backgroundColor, setBackgroundColor] = useState("#808080");

  const handleColorChange = () => {
    const newColor = generateRandomHex();
    setBackgroundColor(newColor);
  };

  useEffect(() => {
    const testCreateRoom = async () => {
      const room = await createRoom({ max_players: 1 });
      console.log("room: ", room);

      const playerId = room.player_id;
      const colors = room.color_sequence;
      console.log(playerId, colors);
    };
    testCreateRoom();
  }, []);

  return (
    <div className="h-screen py-16 px-8" style={{ backgroundColor }}>
      <div className="bg-slate-50 p-2 px-8 rounded-full text-xl">CSSGuessr</div>
      <button onClick={handleColorChange}>Change Color</button>
    </div>
  );
}
