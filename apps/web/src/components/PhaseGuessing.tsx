import { ROUND_DURATION_MS } from "@cssguessr/shared-types";
import Countdown from "./Countdown";

export default function PhaseGuessing({ remainder = 0 }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Countdown duration={ROUND_DURATION_MS} remainder={remainder} />
    </div>
  );
}
