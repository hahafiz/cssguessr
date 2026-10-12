import { ROUND_DURATION_MS } from "@cssguessr/shared-types";
import Countdown from "./Countdown";

export default function PhaseGuessing() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Countdown duration={ROUND_DURATION_MS} />
    </div>
  );
}
