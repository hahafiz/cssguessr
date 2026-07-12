// color, score, gamestate interfaces

export interface GameState {
  user: string;
  color: string;
  score: number;
  round: number;
}

export interface Room {
  id: string;
  players: string[];
}

export interface Score {
  userId: string;
  points: number;
}
