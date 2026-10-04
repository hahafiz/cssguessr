import { useEffect, useRef, useState } from "react";
import { getRoom } from "../../api/rooms";
import {
  type RGBColor,
  type Phase,
  type Room,
  ROUND_DURATION_MS,
  REVEAL_DURATION_MS,
} from "@cssguessr/shared-types";
import { ColorSwatch } from "../ColorSwatch";
import GameOver from "./GameOver";
import { useParams } from "react-router";
import { getStoredPlayerId } from "../../api/playerId";
import GuessRound from "../GuessRound";
import RoundProgress from "../RoundProgress";

export default function MultiplayerGameplay() {
  const [room, setRoom] = useState<Room | null>(null);
  const [now, setNow] = useState<number>(Date.now);
  const [score, setScore] = useState<number>(0);
  const [rgbGuess, setRgbGuess] = useState<RGBColor>([0, 0, 0]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { roomId } = useParams();
  const playerId = roomId ? getStoredPlayerId(roomId) : null;

  useEffect(() => {
    const fetchRoom = async () => {
      if (roomId) {
        const newRoom = await getRoom(roomId);
        setRoom(newRoom);
      }
    };
    fetchRoom();
  }, [roomId]);

  // tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startedAt = room?.started_at
    ? new Date(room.started_at.replace(" ", "T") + "Z").getTime()
    : null;

  const totalRoundDuration = ROUND_DURATION_MS + REVEAL_DURATION_MS;

  let phase: Phase = "guessing";
  let currentRound = 1;
  let elapsed: number;
  let remainder;

  if (startedAt !== null) {
    elapsed = now - startedAt;
    remainder = elapsed % totalRoundDuration;
    phase = remainder < ROUND_DURATION_MS ? "guessing" : "revealed";
    currentRound = Math.floor(elapsed / totalRoundDuration) + 1;
  }

  // reset to guessing when computed round advances
  const prevPhaseRef = useRef(phase);
  useEffect(() => {
    if (phase !== prevPhaseRef.current) {
      prevPhaseRef.current = phase;
      setRgbGuess([0, 0, 0]);
      setSubmitted(false);
    }
  }, [phase]);

  if (room === null) {
    return <p>Loading room..</p>;
  }

  if (!playerId) {
    return <p>Could not find player identity for this room</p>;
  }

  if (currentRound > room.color_sequence.length) {
    return <GameOver roomId={room.id} playerId={playerId} />;
  }

  const backgroundColor = room.color_sequence[currentRound - 1]; // need - 1 here because db round_number is 1-indexed

  return (
    <div className="flex flex-col gap-8 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <RoundProgress
        current={currentRound}
        total={room.color_sequence.length}
      />

      {phase === "guessing" ? (
        <div className="flex flex-col items-center gap-4">
          {remainder !== undefined && (
            <p className="text-white">
              {Math.floor((ROUND_DURATION_MS - remainder) / 1000)} s
            </p>
          )}
          <GuessRound
            backgroundColor={backgroundColor}
            roomId={room.id}
            playerId={playerId}
            currentRound={currentRound}
            alreadySubmitted={submitted}
            onSubmitted={(newScore, guess) => {
              setScore(newScore);
              setRgbGuess(guess);
              setSubmitted(true);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          {remainder !== undefined && (
            <p className="text-white">
              {Math.floor((totalRoundDuration - remainder) / 1000)} s
            </p>
          )}
          <ColorSwatch color={backgroundColor} />
          <div className="flex flex-col gap-2 justify-center rounded-lg bg-white p-4">
            <p>Score: {score}</p>
            <p>Your guess: rgb({rgbGuess.join(", ")})</p>
            <p>Answer: {backgroundColor}</p>
            <p className="text-white">Waiting for next round...</p>
          </div>
        </div>
      )}
    </div>
  );
}
