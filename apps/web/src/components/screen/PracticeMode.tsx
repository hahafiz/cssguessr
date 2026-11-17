import {
  LUMINANCE_THRESHOLD,
  RGB_CHANNELS,
  type RGBColor,
} from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";
import { GuessInput } from "../GuessInput";
import { Button } from "../ui/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getRelativeLuminance, rgbToHex } from "../../utils/colors";
import { HexLabel } from "../HexLabel";

export default function PracticeMode() {
  const navigate = useNavigate();
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([0, 0, 0]);

  const backgroundColor = `rgb(${rgbGuess.join(", ")})`;
  const textColor =
    getRelativeLuminance(rgbGuess) > LUMINANCE_THRESHOLD
      ? "#000000"
      : "#FFFFFF";

  const handleSliderChange = (index: number, newValue: number) => {
    setRgbGuess((prev) => {
      const nextGuess = [...prev] as RGBColor;
      nextGuess[index] = newValue;
      return nextGuess;
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <ColorSwatch color={backgroundColor} textColor={textColor}>
        <HexLabel hex={rgbToHex(rgbGuess)} />
      </ColorSwatch>
      <div className="flex flex-col gap-8 justify-center rounded-lg">
        <GuessInput
          values={rgbGuess}
          channels={RGB_CHANNELS}
          onSliderChange={handleSliderChange}
        />
        <Button variant="secondary" onClick={() => navigate("/")}>
          Return
        </Button>
      </div>
    </div>
  );
}
