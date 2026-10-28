// TODO: score with decorated text
// TODO: reset button
// TODO: share button

import { useEffect, useState } from "react";
import { getResults } from "../../api/rooms";
import { Button } from "../ui/button/Button";
import {
  type GetResultsResponse,
  type GameOverProps,
} from "@cssguessr/shared-types";
import { useNavigate } from "react-router";
import { getStoredPlayerId } from "../../api/playerId";
import { resultRank } from "../../utils/result-rank";

export default function GameOver({ roomId }: GameOverProps) {
  const navigate = useNavigate();
  const [result, setResult] = useState<GetResultsResponse | null>(null);

  const playerId = roomId ? getStoredPlayerId(roomId) : null;

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const fetchResult = async () => {
      try {
        const res = await getResults(roomId);
        if (cancelled) return;
        setResult(res);
        if (res.status === "waiting") {
          timer = setTimeout(fetchResult, 1000);
        }
      } catch (err) {
        console.error("Failed to fetch results: ", err);
        if (!cancelled) timer = setTimeout(fetchResult, 2000);
      }
    };
    fetchResult();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [roomId]);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {result?.status === "complete" ? (
          resultRank(result.scores, (s) => s.total_score).map((score) => {
            const isFirstPlace = score.rank === 1;

            return (
              <div
                key={score.public_id}
                className={`flex gap-4 rounded-lg p-4 ${
                  isFirstPlace
                    ? "bg-amber-100 border-2 border-amber-500 shadow-md"
                    : "bg-white"
                }`}
              >
                <p>#{score.rank}</p>
                <div className="flex flex-col gap-2">
                  {playerId === score.public_id ? (
                    <p>
                      <strong className="font-bold">YOUR</strong> score:
                    </p>
                  ) : (
                    <p>{score.public_id} score:</p>
                  )}
                  <p>{score.total_score}</p>
                </div>
              </div>
            );
          })
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
