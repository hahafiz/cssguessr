import { HEX_SYMBOLS, type HexDigitProps } from "@cssguessr/shared-types";

export function HexDigit({ char, position }: HexDigitProps) {
  const index = HEX_SYMBOLS.indexOf(char);

  return (
    <span
      aria-hidden
      className="inline-block h-[1em] overflow-hidden leading-none"
    >
      <span
        className="flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{
          transform: `translateY(-${index}em)`,
          transitionDelay: `${position * 0}ms`,
        }}
      >
        {HEX_SYMBOLS.map((symbol) => (
          <span key={symbol} className="block h-[1em] leading-none">
            {symbol}
          </span>
        ))}
      </span>
    </span>
  );
}
