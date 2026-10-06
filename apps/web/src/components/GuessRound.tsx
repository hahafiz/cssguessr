import { useCallback, useEffect, useState } from "react";
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
  alreadySubmitted,
  forceSubmit = false,
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

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await submitScore(roomId, playerId, currentRound, rgbGuess);
      onSubmitted(res.score, rgbGuess);
    } catch (err) {
      console.error("Failed to submit score: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [roomId, playerId, currentRound, onSubmitted, rgbGuess]);

  useEffect(() => {
    if (forceSubmit && !alreadySubmitted) {
      // lint: setState-in-effect warning — verified no duplicate submit via network tab
      onSubmit();
    }
  }, [forceSubmit, alreadySubmitted, onSubmit]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <ColorSwatch color={backgroundColor} />
      <div className="flex flex-col justify-center rounded-lg bg-white">
        <GuessInput
          values={rgbGuess}
          channels={RGB_CHANNELS}
          onSliderChange={handleSliderChange}
        />
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting || alreadySubmitted}
        >
          {alreadySubmitted
            ? "Submitted"
            : isSubmitting
              ? "Submitting..."
              : "Guess"}
        </Button>
      </div>
    </div>
  );
}
