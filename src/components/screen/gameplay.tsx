// TODO: gameplay screen
import { useState } from "react";

export function Gameplay() {
  const [backgroundColor, setBackgroundColor] = useState("#808080");

  return (
    <div className="h-screen py-16 px-8" style={{ backgroundColor }}>
      <div className="bg-slate-50 p-2 px-8 rounded-full text-xl">CSSGuessr</div>
    </div>
  );
}
