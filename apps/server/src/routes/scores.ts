import { Router, Request, Response } from "express";
import db from "../database";

const router = Router();

// POST /room/:id/score
router.post(
  "/:id/score",
  async (req: Request, res: Response): Promise<void> => {
    const { id: room_id } = req.params;
    const { player_id, round_number, score } = req.body;

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

    try {
      const roomExists = db
        .prepare("SELECT id FROM rooms WHERE id = ?")
        .get(room_id);
      if (!roomExists) {
        res.status(404).json({ error: "Room not found" });
        return;
      }

      const insertQuery = db.prepare(
        `INSERT INTO scores (room_id, player_id, round_number, score) VALUES (?, ?, ?, ?)`,
      );

      const result = insertQuery.run(room_id, player_id, round_number, score);

      res.status(201).json(result);
    } catch (err) {
      console.error("Error submitting score: ", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
);

export default router;
