import { Router, Request, Response } from "express";

const router = Router();

// PATCH /room/:id/score
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
});

export default router;
