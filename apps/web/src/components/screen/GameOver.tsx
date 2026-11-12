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
import { getStoredPublicId } from "../../api/playerId";
import { resultRank } from "../../utils/result-rank";
import ScoreRow from "../ScoreRow";

export default function GameOver({ roomId }: GameOverProps) {
  const navigate = useNavigate();
  const [result, setResult] = useState<GetResultsResponse | null>(null);

  const myPublicId = roomId ? getStoredPublicId(roomId) : null;

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
          <ol className="flex flex-col gap-2">
            {resultRank(result.scores, (p) => p.total_score).map((p) => (
              <ScoreRow
                key={p.public_id}
                rank={p.rank}
                name={p.name}
                isYou={p.public_id === myPublicId}
                total={p.total_score}
              />
            ))}
          </ol>
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
