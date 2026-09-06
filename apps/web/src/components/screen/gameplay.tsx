// TODO: gameplay screen
import { useEffect, useState } from "react";
import { createRoom, submitScore } from "../../api/rooms";
import type { RGBColor, RoomWithPlayer, Phase } from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";
import { GuessInput } from "../GuessInput";
import { Button } from "../ui/button/button";
import { GameOver } from "./GameOver";

export function Gameplay() {
  const [room, setRoom] = useState<RoomWithPlayer | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([128, 128, 128]);
  const [score, setScore] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>("guessing");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSliderChange = (index: number, newValue: number) => {
    setRgbGuess((prev) => {
      const nextGuess = [...prev] as RGBColor;
      nextGuess[index] = newValue;
      return nextGuess;
    });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const newRoom = await createRoom({ max_players: 1 });
      setRoom(newRoom);
    };
    fetchRoom();
  }, []);

  if (room === null) {
    return <p>Loading room..</p>;
  }

  const backgroundColor = room.color_sequence[currentRound - 1]; // need - 1 here because db round_number is 1-indexed

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitScore(
        room.id,
        room.player_id,
        currentRound,
        rgbGuess,
      );

      setScore(res.score);
      setPhase("revealed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNextRound = () => {
    setCurrentRound(currentRound + 1);
    setPhase("guessing");
    setRgbGuess([128, 128, 128]);
  };

  const onContinue = () => {
    setPhase("complete");
  };

  if (phase === "complete") {
    return <GameOver roomId={room.id} playerId={room.player_id} />;
  }

  return (
    <>
      {phase === "guessing" ? (
        <div>
          <ColorSwatch color={backgroundColor} />
          <GuessInput values={rgbGuess} onSliderChange={handleSliderChange} />
          <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Guess"}
          </Button>
        </div>
      ) : (
        <div>
          <p>{score}</p>
          {currentRound < room.color_sequence.length ? (
            <Button variant="primary" onClick={onNextRound}>
              Next Round
            </Button>
          ) : (
            <Button variant="primary" onClick={onContinue}>
              Continue
            </Button>
          )}
        </div>
      )}
    </>
  );
}
