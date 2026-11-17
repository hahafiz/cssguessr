import type { ColorSwatchProps } from "@cssguessr/shared-types";

export function ColorSwatch({ color, children }: ColorSwatchProps) {
  return (
    <div
      className="flex items-center justify-center h-48 w-48 rounded-full p-2 outline-4 -outline-offset-5 outline-white/30"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}
