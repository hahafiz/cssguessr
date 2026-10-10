// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";
import { Button } from "../ui/button/Button";
import {
  type GetResultsResponse,
  type GameOverProps,
  ROUND_SCORE,
  SEQUENCE_LENGTH,
} from "@cssguessr/shared-types";
import { useNavigate } from "react-router";
import { getStoredPlayerId } from "../../api/playerId";

export default function GameOver({ roomId }: GameOverProps) {
  const navigate = useNavigate();
  const [result, setResult] = useState<GetResultsResponse | null>(null);

  const playerId = roomId ? getStoredPlayerId(roomId) : null;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getResults(roomId);
        setResult(res);
      } catch (err) {
        console.error("Failed to fetch results: ", err);
      }
    };
    fetchResult();
  }, [roomId]);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {result?.status === "complete" ? (
          result.scores.map((score) => (
            <div
              key={score.player_id}
              className="flex flex-col gap-2 rounded-lg bg-white p-4"
            >
              {playerId === score.player_id ? (
                <p>
                  <strong className="font-bold">"YOUR"</strong> score:
                </p>
              ) : (
                <p>{score.player_id} score:</p>
              )}
              <p>
                Your score: {score.total_score} /{" "}
                {ROUND_SCORE * SEQUENCE_LENGTH}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">Waiting for results..</p>
        )}
        <Button variant="primary" onClick={() => navigate("/")}>
          Return to Main Menu
        </Button>
      </div>
    </>
  );
}
