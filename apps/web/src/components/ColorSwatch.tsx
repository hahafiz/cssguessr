interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  return (
    <div className="h-screen py-16 px-8" style={{ backgroundColor: color }} />
  );
}
