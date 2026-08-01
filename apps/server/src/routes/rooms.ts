import { Router, Request, Response } from "express";
import db from "./../database.ts";
import { parseRoomRow } from "./../database.ts";
import { Room, RoomsRow, CreateRoomInput } from "@cssguessr/shared-types";
import crypto from "crypto";

const router = Router();

// POST - create new room
router.post("/", async (req: Request, res: Response) => {
  const { max_players }: CreateRoomInput = req.body;

  if (
    typeof max_players !== "number" ||
    !max_players ||
    max_players >= 0 ||
    max_players < 10
  ) {
    res.status(400).json({ error: "Max player is invalid" });
    return;
  }

  const colorSequence = ["#ff0000", "#00ff00", "#0000ff"];
  const colorJsonStr = JSON.stringify(colorSequence);
  const roomID = crypto.randomUUID();
  const query = db.prepare(
    "INSERT INTO rooms (id, color_sequence, max_players) values (?, ?, ?)",
  );
  const room = query.run(roomID, colorJsonStr, max_players);

  res.json(room);
});

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
