import type { RGBColor } from "@cssguessr/shared-types";

interface SliderProps {
  values: RGBColor;
  onSliderChange: (index: number, value: number) => void;
}
export function GuessInput({ values, onSliderChange }: SliderProps) {
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
            Slider {index + 1}: {value}
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={value}
            onChange={(e) => onSliderChange(index, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
