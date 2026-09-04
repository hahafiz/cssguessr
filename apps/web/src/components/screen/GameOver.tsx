// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";\

interface GameOverProps {
  roomId: string;
  playerId: string
}

export function GameOver({ roomId, playerId } : GameOverProps) {
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchResult = async () => {
      const res = await getResults(roomId);
      setResult(res);
    };
    fetchResult();
  }, [roomId]);

  return <p>Game Over screen here</p>;
}
