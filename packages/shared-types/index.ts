// tables types
export interface RoomsRow {
  id: string;
  color_sequence: string; // an array of numeric tuples
  max_players: number;
  status: "waiting" | "active" | "expired";
  started_at: string;
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
