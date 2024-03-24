import { Router, Request, Response } from 'express';
import VideoEp from '../endpoints/VideoEp';
import PictoryEp from '../endpoints/PictoryEp';

const router = Router();

router.post('/merge_videos', VideoEp.mergeVideos);
router.post('/generate-pictory-video', PictoryEp.generatePictoryVideo)

export default router;