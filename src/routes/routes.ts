import { Router, Request, Response } from "express";
import VideoEp from "../endpoints/VideoEp";
import PictoryEp from "../endpoints/PictoryEp";

const router = Router();

// Middleware to extend the timeout
const extendTimeout = (req: any, res: any, next: any) => {
  req.setTimeout(500000); // Extend the timeout, e.g., 500000 milliseconds = 500 seconds
  next();
};

router.post("/merge_videos", extendTimeout, VideoEp.mergeVideos);
router.post(
  "/generate-pictory-video",
  extendTimeout,
  PictoryEp.generatePictoryVideo
);

export default router;
