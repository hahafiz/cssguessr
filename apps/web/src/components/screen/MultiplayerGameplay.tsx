import { useEffect, useState } from "react";
import { getRoom } from "../../api/rooms";
import {
  type RGBColor,
  type Phase,
  type Room,
  ROUND_DURATION_MS,
} from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";
import { Button } from "../ui/button/Button";
import GameOver from "./GameOver";
import { useParams } from "react-router";
import { getStoredPlayerId } from "../../api/playerId";
import GuessRound from "../GuessRound";
import RoundProgress from "../RoundProgress";

export default function MultiplayerGameplay() {
  const [room, setRoom] = useState<Room | null>(null);
  // const [currentRound, setCurrentRound] = useState<number>(1);
  const [now, setNow] = useState<number>(Date.now);
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([0, 0, 0]);
  const [score, setScore] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>("guessing");

  const { roomId } = useParams();
  const playerId = roomId ? getStoredPlayerId(roomId) : null;

  const currentRound = (startedAt: number, now: number) => {
    return Math.floor((now - startedAt) / ROUND_DURATION_MS) + 1;
  };

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        const newRoom = await getRoom(roomId);
        setRoom(newRoom);
      }
    };
    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  });

  if (room === null) {
    return <p>Loading room..</p>;
  }

  if (!playerId) {
    return <p>Could not find player identity for this room</p>;
  }

  const backgroundColor = room.color_sequence[currentRound - 1]; // need - 1 here because db round_number is 1-indexed

  const onNextRound = () => {
    setCurrentRound(currentRound + 1);
    setPhase("guessing");
    setRgbGuess([0, 0, 0]);
  };

  const onContinue = () => {
    setPhase("complete");
  };

  if (phase === "complete") {
    return <GameOver roomId={room.id} playerId={playerId} />;
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <RoundProgress
        current={currentRound}
        total={room.color_sequence.length}
      />
      {phase === "guessing" ? (
        <GuessRound
          backgroundColor={backgroundColor}
          roomId={room.id}
          playerId={playerId}
          currentRound={currentRound}
          onSubmitted={(newScore, guess) => {
            setScore(newScore);
            setPhase("revealed");
            setRgbGuess(guess);
          }}
        />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <ColorSwatch color={backgroundColor} />
          <div className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4">
            <p>Score: {score}</p>
            <p>Your guess: rgb({rgbGuess.join(", ")})</p>
            <p>Answer: {room.color_sequence[currentRound - 1]}</p>
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
        </div>
      )}
    </div>
  );
}
