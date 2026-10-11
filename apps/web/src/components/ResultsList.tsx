import type { ResultListScore } from "@cssguessr/shared-types";

export default function ResultsList(res: ResultListScore, playerId: string) {
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
  </div>;
}
