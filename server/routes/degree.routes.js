import express from 'express';
import { addDegree, getAllDegrees, getDegreeByName, updateDegreeByName, deleteDegreeByName } from '../controllers/degree.controller.js';

const router = express.Router();

router.post('/', addDegree);
router.get('/', getAllDegrees);
router.get('/:name', getDegreeByName);
router.put('/:name', updateDegreeByName);
router.delete('/:name', deleteDegreeByName);

export default router;