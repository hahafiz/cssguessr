import { HexDigit } from "./HexDigit";

export function HexLabel({ hex }: { hex: string }) {
  return (
    <p className="flex font-mono text-xl uppercase leading-none text-white">
      <span className="sr-only">#{hex}</span>
      <span aria-hidden>#</span>
      {hex.split("").map((char, i) => (
        <HexDigit key={i} char={char} position={i} />
      ))}
    </p>
  );
}
