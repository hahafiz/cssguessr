import { useState } from "react";
import { ColorSwatch } from "./ColorSwatch";
import { GuessInput } from "./GuessInput";
import { Button } from "./ui/button/Button";
import {
  RGB_CHANNELS,
  type GuessRoundProps,
  type RGBColor,
} from "@cssguessr/shared-types";
import { submitScore } from "../api/rooms";

export default function GuessRound({
  backgroundColor,
  roomId,
  playerId,
  currentRound,
  onSubmitted,
}: GuessRoundProps) {
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([0, 0, 0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSliderChange = (index: number, newValue: number) => {
    setRgbGuess((prev) => {
      const nextGuess = [...prev] as RGBColor;
      nextGuess[index] = newValue;
      return nextGuess;
    });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitScore(roomId, playerId, currentRound, rgbGuess);
      onSubmitted(res.score);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <ColorSwatch color={backgroundColor} />
      <div className="flex flex-col justify-center rounded-lg bg-white">
        <GuessInput
          values={rgbGuess}
          channels={RGB_CHANNELS}
          onSliderChange={handleSliderChange}
        />
        <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Guess"}
        </Button>
      </div>
    </div>
  );
}
