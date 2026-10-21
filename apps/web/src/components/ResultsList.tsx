import type { ResultsListProps } from "@cssguessr/shared-types";

export default function ResultsList({
  roundResults,
  playerId,
}: ResultsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {roundResults?.status === "complete" ? (
        roundResults?.scores.map((res) => (
          <div
            key={res.player_id}
            className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4"
          >
            {playerId === res.player_id ? (
              <p>
                <strong className="font-bold">"YOUR"</strong> score:
              </p>
            ) : (
              <p>{res.player_id} score:</p>
            )}
            <p>Score: {res.score}</p>
          </div>
        ))
      ) : (
        <p className="text-white">Waiting for results...</p>
      )}
    </div>
  );
}
