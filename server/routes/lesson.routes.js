import express from 'express';
import { addLesson, getLessonsByCourseName, updateLessonByName, deleteLessonByName } from '../controllers/lesson.controller.js';

const router = express.Router();

router.post('/', addLesson);
router.get('/:courseName', getLessonsByCourseName);
router.put('/:name', updateLessonByName);
router.delete('/:name', deleteLessonByName);

export default router;

