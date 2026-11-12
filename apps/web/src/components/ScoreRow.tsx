import type { ScoreRowProps } from "@cssguessr/shared-types";

export default function ScoreRow({
  rank,
  name,
  isYou,
  total,
  roundScore,
}: ScoreRowProps) {
  const isFirst = rank === 1;

  return (
    <li
      className={`flex items-center gap-4 rounded-lg p-4 ${
        isFirst ? "border-2 border-amber-400 bg-amber-50" : "bg-white"
      }`}
    >
      <span className="font-bold">#{rank}</span>
      <div className="flex flex-col">
        <p>
          {name}
          {isYou && <strong className="pl-1">(YOU)</strong>}
        </p>
        <p className="tabular-nums">
          {total}
          {roundScore !== undefined && (
            <span className="pl-2 text-sm text-green-600">+{roundScore}</span>
          )}
        </p>
      </div>
    </li>
  );
}
