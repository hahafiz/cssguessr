import type { RoundProgressProps } from "@cssguessr/shared-types";

export default function RoundProgress({ current, total }: RoundProgressProps) {
  return (
    <>
      <p className="text-xl text-white">
        Round {current} / {total}
      </p>
    </>
  );
}
