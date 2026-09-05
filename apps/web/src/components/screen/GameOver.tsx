// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";
import type {
  GetResultsResponse,
  GameOverProps,
} from "@cssguessr/shared-types";

export function GameOver({ roomId, playerId }: GameOverProps) {
  const [result, setResult] = useState<GetResultsResponse | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await getResults(roomId);
      setResult(res);
    };
    fetchResult();
  }, [roomId]);

  return <p>Game Over screen here</p>;
}
