import { Router, Request, Response } from "express";
import db from "./../database.ts";
import { parseRoomRow } from "./../database.ts";
import { Room, RoomsRow, CreateRoomInput } from "@cssguessr/shared-types";
import crypto from "crypto";
import { generateRawColorSequence } from "../utils/colors.ts";

const router = Router();
const getRoomId = db.prepare("SELECT * FROM rooms WHERE id = ?");
const insertRoom = db.prepare(
  "INSERT INTO rooms (id, color_sequence, max_players) values (?, ?, ?)",
);
const insertPlayer = db.prepare(
  "INSERT INTO players (player_id, room_id, is_host) values (?, ?, ?)",
);

// POST /room - create new room
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { max_players }: CreateRoomInput = req.body;
  const isValidMaxPlayer =
    typeof max_players === "number" &&
    Number.isInteger(max_players) &&
    max_players >= 1 &&
    max_players <= 10;

  if (!isValidMaxPlayer) {
    res.status(400).json({ error: "Max player is invalid" });
    return;
  }

  const colorSequence = generateRawColorSequence();
  const colorJsonStr = JSON.stringify(colorSequence); // convert to json so BE can read
  const roomID = crypto.randomUUID();
  const playerID = crypto.randomUUID();

  let newRoomRow: RoomsRow | undefined;

  try {
    db.exec("BEGIN"); // starts transaction
    insertRoom.run(roomID, colorJsonStr, max_players); // insert newly created roomID to database
    newRoomRow = getRoomId.get(roomID) as RoomsRow | undefined; // fetched the newly created room as raw data
    insertPlayer.run(playerID, roomID, 1);
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  if (!newRoomRow) {
    res.status(500).json({ error: "Room created but could not be retrieved" });
    return;
  }

  const newRoom: Room = parseRoomRow(newRoomRow); // parse the raw data so FE can read
  res.json({ ...newRoom, player_id: playerID });
});

// GET /room/:id - get room
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({ error: "ID is not a string" });
    return;
  }

  let row;

  try {
    row = getRoomId.get(id) as RoomsRow | undefined;
    if (!row) {
      res.status(404).json({ error: "Game ID not found" });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: "Error" });
    return;
  }

  const parseRow: Room = parseRoomRow(row);
  res.json(parseRow);
});

export default router;
