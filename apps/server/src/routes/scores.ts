import { Router, Request, Response } from "express";
import db from "../database";
import {
  getSubmittedPlayerCount,
  isRoundComplete,
} from "../utils/completion.ts";
import { getRoomId } from "./rooms.ts";
import { RoomsRow } from "@cssguessr/shared-types";

const router = Router();
const SQLITE_CONSTRAINT_FOREIGNKEY = 787;

const insertQuery = db.prepare(
  `INSERT INTO scores (room_id, player_id, round_number, score) VALUES (?, ?, ?, ?)`,
);

const getPlayerScore = db.prepare(
  "SELECT player_id, score FROM scores WHERE room_id = ? AND round_number = ?",
);

// POST /room/test/:id
router.post("/test/:id", async (req: Request, res: Response): Promise<void> => {
  const { id: room_id } = req.params;

  if (typeof room_id !== "string") {
    res.status(400).json({ error: "ID is not a string" });
    return;
  }

  try {
    const result = getSubmittedPlayerCount(room_id, 1);

    res.status(201).json(result);
  } catch (err) {}
});

// POST /room/:id/score - submit score
router.post(
  "/:id/score",
  async (req: Request, res: Response): Promise<void> => {
    const { id: room_id } = req.params;
    const { player_id, round_number, score } = req.body;

    if (typeof room_id !== "string") {
      res.status(400).json({ error: "ID is not a string" });
      return;
    }

    if (
      !player_id ||
      typeof round_number !== "number" ||
      typeof score !== "number"
    ) {
      res.status(400).json({
        error:
          "Missing or invalid field. player_id (string), round_number (number), score (number)",
      });
      return;
    }

    if (round_number > 1 && !isRoundComplete(room_id, round_number - 1)) {
      res.status(400).json({ error: "Previous round is not yet complete" });
      return;
    }

    try {
      const result = insertQuery.run(room_id, player_id, round_number, score);

      res.status(201).json(result);
    } catch (err) {
      const isForeignKeyError =
        err instanceof Error &&
        "errcode" in err &&
        err.errcode === SQLITE_CONSTRAINT_FOREIGNKEY;

      if (isForeignKeyError) {
        res.status(404).json({ error: "Room not found" });
        return;
      }

      console.error("Error submitting score: ", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// GET /room/:id/results/:round - per-round result
router.get(
  "/:id/results/:round",
  async (req: Request, res: Response): Promise<void> => {
    const { id: room_id, round: raw_round_number } = req.params;

    if (typeof room_id !== "string") {
      res.status(400).json({ error: "ID is not a string" });
      return;
    }

    const round_number: number = Number(raw_round_number);
    if (Number.isNaN(round_number)) {
      res.status(400).json({ error: "Round number must be a valid number" });
      return;
    }

    const isRoomExist = getRoomId.get(room_id) as RoomsRow | undefined;
    let allPlayerScore;

    if (!isRoomExist) {
      res.status(404).json({ error: "Room ID is not found" });
      return;
    }

    try {
      if (!isRoundComplete(room_id, round_number)) {
        res.status(200).json({ status: "waiting" });
        return;
      }

      allPlayerScore = getPlayerScore.all(room_id, round_number);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ status: "complete", scores: allPlayerScore });
  },
);

export default router;
