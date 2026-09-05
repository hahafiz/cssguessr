// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";
import type {
  GetResultsResponse,
  GameOverProps,
} from "@cssguessr/shared-types";

export function GameOver({ roomId }: GameOverProps) {
  const [result, setResult] = useState<GetResultsResponse | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await getResults(roomId);
      setResult(res);
    };
    fetchResult();
  }, [roomId]);

  return (
    <>
      {result?.status === "complete" ? (
        result.scores.map((score) => (
          <div key={score.player_id}>
            <p>Player: {score.player_id}</p>
            <p>Total score: {score.total_score}</p>
          </div>
        ))
      ) : (
        <p>Waiting for results..</p>
      )}
    </>
  );
}
