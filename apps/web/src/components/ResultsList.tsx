import type { ResultsListProps } from "@cssguessr/shared-types";
import { resultRank } from "../utils/result-rank";

export default function ResultsList({
  roundResults,
  playerId,
}: ResultsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {roundResults?.status === "complete" ? (
        resultRank(roundResults.scores, (s) => s.score).map((score) => {
          const isFirstPlace = score.rank === 1;

          return (
            <div
              key={score.player_id}
              className={`flex gap-4 rounded-lg p-4 ${
                isFirstPlace
                  ? "bg-amber-50 border-2 border-amber-400"
                  : "bg-white"
              }`}
            >
              <p>#{score.rank}</p>
              <div className="flex flex-col gap-2">
                {playerId === score.player_id ? (
                  <p>
                    <strong className="font-bold">YOUR</strong> score:
                  </p>
                ) : (
                  <p>{score.player_id} score:</p>
                )}
                <p>{score.score}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white">Waiting for results...</p>
      )}
    </div>
  );
}
