import { Router, Request, Response } from "express";
import db from "./../database.ts";
import { parseRoomRow } from "./../database.ts";
import {
  Room,
  RoomsRow,
  CreateRoomInput,
  PlayersRow,
} from "@cssguessr/shared-types";
import crypto from "crypto";
import { generateRawColorSequence } from "../utils/colors.ts";

const router = Router();
export const getRoomId = db.prepare("SELECT * FROM rooms WHERE id = ?");
const getPlayerRow = db.prepare(
  "SELECT * FROM players WHERE room_id = ? AND player_id = ?",
);
const insertRoom = db.prepare(
  "INSERT INTO rooms (id, color_sequence, max_players) values (?, ?, ?)",
);
const insertPlayer = db.prepare(
  "INSERT INTO players (player_id, room_id, is_host) values (?, ?, ?)",
);

const roomCapacity = db.prepare(
  "SELECT COUNT(*) as count FROM players WHERE room_id = ?",
);

const changeRoomStatus = db.prepare(
  "UPDATE rooms SET status = ?, started_at = CURRENT_TIMESTAMP WHERE id = ?",
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

  const room: Room = parseRoomRow(newRoomRow); // parse the raw data so FE can read
  res.json({ ...room, player_id: playerID });
});

// POST /room/:id - join room
router.post("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id: room_id } = req.params;
  const playerID = crypto.randomUUID();

  if (typeof room_id !== "string") {
    res.status(400).json({ error: "ID is not a string" });
    return;
  }

  const isRoomExist = getRoomId.get(room_id) as RoomsRow | undefined;
  const maxPlayers = isRoomExist?.max_players;
  const roomStatus = isRoomExist?.status;
  const isCapacity = roomCapacity.get(room_id) as { count: number } | undefined;

  if (!isRoomExist) {
    res.status(404).json({ error: "Room ID is not found" });
    return;
  }

  try {
    if (roomStatus !== "waiting") {
      res.status(400).json({ error: "Game already started" });
      return;
    }

    if (!isCapacity || !maxPlayers || isCapacity.count >= maxPlayers) {
      res.status(400).json({ error: "Room is full" });
      return;
    }

    insertPlayer.run(playerID, room_id, 0);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  const room: Room = parseRoomRow(isRoomExist);
  res.json({ ...room, player_id: playerID });
});

// POST /room/:id - start room
router.post(
  "/:id/start",
  async (req: Request, res: Response): Promise<void> => {
    const { player_id } = req.body;
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({ error: "ID is not a string" });
      return;
    }

    if (!player_id) {
      res.status(400).json({ error: "Invalid player ID!" });
      return;
    }

    let startedRoomRow: RoomsRow | undefined;

    try {
      // TODO: these run two DB requests. make it one
      const player = getPlayerRow.get(id, player_id) as PlayersRow | undefined;
      const roomRow = getRoomId.get(id) as RoomsRow | undefined;

      if (roomRow?.status === "active") {
        res.status(400).json({ error: "Game already started" });
        return;
      }

      if (roomRow?.status === "expired") {
        res.status(400).json({ error: "Game already concluded" });
        return;
      }

      if (!player) {
        res.status(400).json({ error: "Player ID not exist" });
        return;
      }

      if (!player.is_host) {
        res.status(400).json({ error: "Only host can starts the game!" });
        return;
      }

      changeRoomStatus.run("active", id);
      startedRoomRow = getRoomId.get(id) as RoomsRow | undefined;
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!startedRoomRow) {
      res
        .status(500)
        .json({ error: "Room created but could not be retrieved" });
      return;
    }
    const room: Room = parseRoomRow(startedRoomRow);
    res.json(room);
  },
);

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
