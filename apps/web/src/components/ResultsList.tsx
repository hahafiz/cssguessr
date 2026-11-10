import type { ResultsListProps } from "@cssguessr/shared-types";
import { resultRank } from "../utils/result-rank";

export default function ResultsList({
  roundResults,
  myPublicId,
}: ResultsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {roundResults?.status === "complete" ? (
        resultRank(roundResults.scores, (s) => s.total_score).map((score) => {
          const isFirstPlace = score.rank === 1;

          return (
            <div
              key={score.public_id}
              className={`flex gap-4 rounded-lg p-4 ${
                isFirstPlace
                  ? "bg-amber-50 border-2 border-amber-400"
                  : "bg-white"
              }`}
            >
              <p>#{score.rank}</p>
              <div className="flex flex-col gap-2">
                <p>
                  {score.name}
                  {myPublicId === score.public_id && (
                    <strong className="font-bold pl-1">YOU</strong>
                  )}
                </p>
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
