import {
  REVEAL_DURATION_MS,
  ROUND_DURATION_MS,
  type PhaseRevealedProps,
} from "@cssguessr/shared-types";
import Countdown from "./Countdown";
import { ColorSwatch } from "./ColorSwatch";

export default function PhaseRevealed({
  backgroundColor,
  userGuess,
  remainder = undefined,
}: PhaseRevealedProps) {
  const totalRoundDuration = ROUND_DURATION_MS + REVEAL_DURATION_MS;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {remainder !== undefined && (
        <Countdown duration={totalRoundDuration} remainder={remainder} />
      )}
      <ColorSwatch color={backgroundColor} />
      {/* TODO: CAN SEE OTHER PLAYERS' GUESS
          REQUIRE SCHEMA AND BE CHANGES */}
      <div className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4">
        <p>Answer: {backgroundColor}</p>
        <p>Your guess: rgb({userGuess})</p>
        <p>Waiting for next round...</p>
      </div>
    </div>
  );
}
