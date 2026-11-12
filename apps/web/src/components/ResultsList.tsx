import type { ResultsListProps } from "@cssguessr/shared-types";
import { resultRank } from "../utils/result-rank";
import ScoreRow from "./ScoreRow";

export default function ResultsList({
  roundResults,
  myPublicId,
}: ResultsListProps) {
  if (roundResults?.status !== "complete") {
    return <p className="text-white">Waotomg for results...</p>;
  }

  return (
    <ol className="flex flex-col gap-2">
      {resultRank(roundResults.scores, (p) => p.total_score).map((p) => (
        <ScoreRow
          key={p.public_id}
          rank={p.rank}
          name={p.name}
          isYou={p.public_id === myPublicId}
          total={p.total_score}
          roundScore={p.score}
        />
      ))}
    </ol>
  );
}
