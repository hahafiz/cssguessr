import { type SliderProps } from "@cssguessr/shared-types";

export function GuessInput({ values, channels, onSliderChange }: SliderProps) {
  return (
    <div
      style={{
        padding: "16px",
      }}
    >
      {values.map((value, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <label>
            {channels[index].label} : {value}
          </label>
          <input
            type="range"
            min={channels[index].min}
            max={channels[index].max}
            value={value}
            onChange={(e) => onSliderChange(index, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
