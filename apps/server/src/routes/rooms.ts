import { Router, Request, Response } from "express";
import db from "./../database.ts";
import { parseRoomRow } from "./../database.ts";
import { Room, RoomsRow } from "@cssguessr/shared-types";

const router = Router();

// POST - create new room
router.post("/", async (req: Request, res: Response) => {});

// GET - get room
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({ error: "ID is not a string" });
    return;
  }

  const query = db.prepare("SELECT * FROM rooms WHERE id = ?");

  const row = query.get(id) as RoomsRow | undefined;
  if (!row) {
    res.status(404).json({ error: "Game ID not found" });
    return;
  }

  const parseRow: Room = parseRoomRow(row);

  res.json(parseRow);
});

export default router;
