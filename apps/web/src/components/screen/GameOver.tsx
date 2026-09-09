// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";
import { Button } from "../ui/button/Button";
import type {
  GetResultsResponse,
  GameOverProps,
} from "@cssguessr/shared-types";
import { useNavigate } from "react-router";

export default function GameOver({ roomId }: GameOverProps) {
  const navigate = useNavigate();
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
            <p>Your score: {score.total_score} / 1000</p>
            <Button variant="primary" onClick={() => navigate("/")}>
              Return to Main Menu
            </Button>
          </div>
        ))
      ) : (
        <p>Waiting for results..</p>
      )}
    </>
  );
}
