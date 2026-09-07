import { type SliderProps } from "@cssguessr/shared-types";

export function GuessInput({ values, channels, onSliderChange }: SliderProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
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
