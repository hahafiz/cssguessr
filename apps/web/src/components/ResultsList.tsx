import type { ResultsListProps } from "@cssguessr/shared-types";

export default function ResultsList({ scores, playerId }: ResultsListProps) {
  return (
    <div
      key={scores.player_id}
      className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4"
    >
      {playerId === scores.player_id ? (
        <p>
          <strong className="font-bold">"YOUR"</strong> score:
        </p>
      ) : (
        <p>{scores.player_id} score:</p>
      )}
      <p>Score: {scores.score}</p>
    </div>
  );
}
