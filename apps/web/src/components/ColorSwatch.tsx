interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  return (
    <div
      className="h-48 w-48 rounded-full p-2 outline-4 -outline-offset-5 outline-white/30"
      style={{ backgroundColor: color }}
    />
  );
}
