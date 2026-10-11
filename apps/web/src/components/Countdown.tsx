import type { CountdownProps } from "@cssguessr/shared-types";

export default function Countdown({ duration, remainder }: CountdownProps) {
  if (remainder === undefined) return null;
  const getSecondsLeft = (d: number) => Math.floor((d - remainder) / 1000);

  return <p className="text-white">{getSecondsLeft(duration)} s</p>;
}
