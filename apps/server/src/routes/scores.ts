import { Router, Request, Response } from "express";
import db from "../database";
import { getSubmittedPlayerCount } from "../utils/completion.ts";

const router = Router();
const SQLITE_CONSTRAINT_FOREIGNKEY = 787;

const insertQuery = db.prepare(
  `INSERT INTO scores (room_id, player_id, round_number, score) VALUES (?, ?, ?, ?)`,
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

// POST /room/:id/score
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

export default router;
