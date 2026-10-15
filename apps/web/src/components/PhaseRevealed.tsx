import {
  REVEAL_DURATION_MS,
  ROUND_DURATION_MS,
  type PhaseRevealedProps,
} from "@cssguessr/shared-types";
import Countdown from "./Countdown";
import { ColorSwatch } from "./ColorSwatch";

export default function PhaseRevealed({
  backgroundColor,
  playerId,
  userGuess,
  roundResult,
  remainder = 0,
}: PhaseRevealedProps) {
  const totalRoundDuration = ROUND_DURATION_MS + REVEAL_DURATION_MS;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {remainder && (
        <Countdown duration={totalRoundDuration} remainder={remainder} />
      )}
      <ColorSwatch color={backgroundColor} />
      <div className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4">
        <p className="text-white">Answer: {backgroundColor}</p>
        <p className="text-white">Your guess: rgb({userGuess})</p>
        <p className="text-white">Waiting for next round...</p>
      </div>
      {roundResult.status === "complete" ? (
        roundResult.scores.map((res) => (
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
        <p className="text-white">Waiting for results..</p>
      )}
    </div>
  );
}
