import { REVEAL_DURATION_MS, ROUND_DURATION_MS } from "@cssguessr/shared-types";
import Countdown from "./Countdown";
import { ColorSwatch } from "./ColorSwatch";

export default function PhaseRevealed({ backgroundColor }) {
  const totalRoundDuration = ROUND_DURATION_MS + REVEAL_DURATION_MS;

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Countdown duration={totalRoundDuration} />
      <ColorSwatch color={backgroundColor} />
    </div>
  );
}
