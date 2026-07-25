import { Router, Request, Response } from "express";

const router = Router();

router.use(function (req: Request, res: Response) {
  console.log("Middleware called");
});

// POST - create new room
router.post("/", async (req: Request, res: Response) => {});

// GET - get room
router.get("/", async (req: Request, res: Response) => {});
