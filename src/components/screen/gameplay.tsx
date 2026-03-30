// TODO: gameplay screen
import { useState } from "react";
import { type GameState } from "../../types/game";
import { generateRandomHex } from "../../lib/color-generator";

export function Gameplay({ user, color, score, round }: GameState) {
  const [backgroundColor, setBackgroundColor] = useState("#808080");

  const handleColorChange = () => {
    const newColor = generateRandomHex();
    setBackgroundColor(newColor);
  };

  return (
    <div className="h-screen py-16 px-8" style={{ backgroundColor }}>
      <div className="bg-slate-50 p-2 px-8 rounded-full text-xl">CSSGuessr</div>
      <button onClick={handleColorChange}>Change Color</button>
    </div>
  );
}
