export const SEQUENCE_LENGTH = 10;
export const ROUND_SCORE = 1000;
export const ROUND_DURATION_MS = 11000; // 11000
export const REVEAL_DURATION_MS = 6000; // 6000
export const SUBMIT_GRACE_MS = 3000;

// tables types
export interface RoomsRow {
  id: string;
  color_sequence: string; // an array of numeric tuples
  max_players: number;
  status: "waiting" | "active" | "expired";
  started_at: string | null;
  created_at: string;
}

export interface ScoresRow {
  id: number;
  room_id: string; // matches FK to rooms.id
  player_id: string;
  round_number: number;
  score: number;
}

export interface PlayersRow {
  id: number;
  player_id: string;
  room_id: string;
  is_host: number;
  joined_at: string;
}

export type RawColor = [number, number, number]; // [hue 0-360, saturation 0-100, lightness 0-100]
export type RGBColor = [number, number, number];
export type ColorFormat = "rgb" | "hsl" | "rgba" | "hsla";

// cleaned up version for frontend/API responses
export interface Room extends Omit<RoomsRow, "color_sequence"> {
  id: string;
  color_sequence: string[];
}

export const NAME_MAX_LENGTH = 20;

export interface RoomWithPlayer extends Room {
  player_id: string;
  public_id: string;
  is_host: number;
  name: string;
}

// user input
export interface CreateRoomInput {
  max_players?: number;
}

export interface PlayerWithRoom {
  is_host: number;
  id: string;
  color_sequence: string;
  max_players: number;
  status: "waiting" | "active" | "expired";
  started_at: string | null;
  created_at: string;
}

export interface SubmitScoreResult {
  changes: number;
  lastInsertRowId: number;
  score: number;
}

export type Phase = "guessing" | "revealed" | "complete";

export interface GameOverProps {
  roomId: string;
  playerId: string;
}

export interface ResultsWaiting {
  status: "waiting";
}

export interface ResultsComplete {
  status: "complete";
  scores: { public_id: string; name: string; total_score: number }[];
}

export interface RoundResultsComplete {
  status: "complete";
  scores: { public_id: string; name: string; score: number }[];
}

export interface ResultsListProps {
  roundResults: GetRoundResult | null;
  playerId: string;
}

export type GetResultsResponse = ResultsWaiting | ResultsComplete;
export type GetRoundResult = ResultsWaiting | RoundResultsComplete;

export interface RenamePlayer {
  playerId: string;
  name: string;
}

export interface ColorChannel {
  label: string;
  min: number;
  max: number;
}

export interface ColorSwatchProps {
  color: string;
}

export interface SliderProps {
  values: RGBColor;
  channels: ColorChannel[];
  onSliderChange: (index: number, value: number) => void;
}

export const RGB_CHANNELS: ColorChannel[] = [
  { label: "Red", min: 0, max: 255 },
  { label: "Green", min: 0, max: 255 },
  { label: "Blue", min: 0, max: 255 },
];

export interface PlayerListItem {
  public_id: string;
  name: string;
  is_host: number;
}

export interface GuessRoundProps {
  backgroundColor: string;
  roomId: string;
  playerId: string;
  currentRound: number;
  alreadySubmitted: boolean;
  forceSubmit?: boolean;
  remainder?: number;
  onSubmitted: (score: number, guess: RGBColor) => void;
}

export interface PhaseRevealedProps {
  backgroundColor: string;
  userGuess: string;
  remainder?: number;
}

export interface RoundProgressProps {
  current: number;
  total: number;
}

export interface CountdownProps {
  duration: number;
  remainder?: number;
}
