import express from 'express';
import { addCourse, getCoursesByYearAndDegree, updateCourseByName, deleteCourseByName } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/', addCourse);
router.get('/:yearName/:degreeName', getCoursesByYearAndDegree);
router.put('/:name', updateCourseByName);
router.delete('/:name', deleteCourseByName);

export default router;