import { type SliderProps } from "@cssguessr/shared-types";

export function GuessInput({ values, channels, onSliderChange }: SliderProps) {
  return (
    <div className="flex w-72 flex-col gap-5 rounded-lg bg-white p-4">
      {values.map((value, index) => {
        const { label, min, max, color = "#3b82f6" } = channels[index];
        const pct = ((value - min) / (max - min)) * 100;

        return (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <label htmlFor={`slider-${label}`}>{label}</label>
              <span className="tabular-nums">{value}</span>
            </div>
            <input
              id={`slider-${label}`}
              type="range"
              className="slider"
              min={min}
              max={max}
              value={value}
              style={
                { "--fill": color, "--pct": `${pct}%` } as React.CSSProperties
              }
              onChange={(e) => onSliderChange(index, Number(e.target.value))}
            />
          </div>
        );
      })}
    </div>
  );
}
