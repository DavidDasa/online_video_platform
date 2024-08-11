import express from 'express';
import { getVideosByLessonName, addVideo, getVideoById, updateVideo, deleteVideo } from '../controllers/video.controller.js';
const router = express.Router();

router.get('/lesson/:lessonName', getVideosByLessonName); // Get videos by lesson name
router.post('/', addVideo);
router.get('/:id', getVideoById);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
