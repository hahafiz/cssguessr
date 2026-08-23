import { Router, Request, Response } from "express";
import db from "../database";
import { isGameComplete, isRoundComplete } from "../utils/completion.ts";
import { RawColor, RGBColor, RoomsRow } from "@cssguessr/shared-types";
import {
  getRoomId,
  insertQuery,
  getPlayerScore,
  getPlayerFinalScore,
} from "../utils/queries.ts";
import { calculateScore, hslToRgb } from "../utils/colors.ts";

const router = Router();
const SQLITE_CONSTRAINT_FOREIGNKEY = 787;

// POST /room/:id/score - submit score
router.post(
  "/:id/score",
  async (req: Request, res: Response): Promise<void> => {
    const { id: room_id } = req.params;
    const { player_id, round_number, guessed_r, guessed_g, guessed_b } =
      req.body;

    if (typeof room_id !== "string") {
      res.status(400).json({ error: "ID is not a string" });
      return;
    }

    if (
      !player_id ||
      typeof round_number !== "number" ||
      typeof guessed_r !== "number" ||
      typeof guessed_g !== "number" ||
      typeof guessed_b !== "number"
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

    const roomRow = getRoomId.get(room_id) as RoomsRow | undefined;
    if (!roomRow) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    const colorSequence: RawColor[] = JSON.parse(roomRow.color_sequence);
    const actualHsl = colorSequence[round_number - 1];
    if (!actualHsl) {
      res.status(400).json({ error: "Invalid round number" });
      return;
    }

    const actualRgb = hslToRgb(actualHsl);
    const guessRgb: RGBColor = [guessed_r, guessed_g, guessed_b];
    const score = calculateScore(actualRgb, guessRgb);

    try {
      const result = insertQuery.run(room_id, player_id, round_number, score);
      res.status(201).json({ ...result, score });
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

// GET /room/:id/results - final results
router.get(
  "/:id/results",
  async (req: Request, res: Response): Promise<void> => {
    const { id: room_id } = req.params;

    if (typeof room_id !== "string") {
      res.status(400).json({ error: "ID is not a string" });
      return;
    }

    const isRoomExist = getRoomId.get(room_id) as RoomsRow | undefined;
    if (!isRoomExist) {
      res.status(404).json({ error: "Room ID is not found" });
      return;
    }

    let allPlayerScore;
    try {
      if (!isGameComplete(room_id)) {
        res.status(200).json({ status: "waiting" });
        return;
      }

      allPlayerScore = getPlayerFinalScore.all(room_id);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ status: "complete", scores: allPlayerScore });
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
    if (!isRoomExist) {
      res.status(404).json({ error: "Room ID is not found" });
      return;
    }

    let allPlayerScore;
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
