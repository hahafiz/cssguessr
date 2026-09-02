// TODO: gameplay screen
import { useEffect, useState } from "react";
import { createRoom, submitScore } from "../../api/rooms";
import type { RGBColor, RoomWithPlayer } from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";
import { GuessInput } from "../GuessInput";
import { Button } from "../ui/button/button";

export function Gameplay() {
  const [room, setRoom] = useState<RoomWithPlayer | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([128, 128, 128]);
  const [score, setScore] = useState<number>(0);

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

  const onSubmit = async () => {
    const res = await submitScore(
      room.id,
      room.player_id,
      currentRound,
      rgbGuess,
    );
    setScore(res.score);
  };

  const backgroundColor = room.color_sequence[currentRound - 1]; // need - 1 here because db round_number is 1-indexed

  return (
    <>
      <ColorSwatch color={backgroundColor} />
      <GuessInput values={rgbGuess} onSliderChange={handleSliderChange} />
      <Button type="submit" onClick={onSubmit}>
        Guess
      </Button>
    </>
  );
}
