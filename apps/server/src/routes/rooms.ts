import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// POST - create new room
router.post("/", async (req: Request, res: Response) => {});

// GET - get room
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Game ID not found" });
    return;
  }
});
