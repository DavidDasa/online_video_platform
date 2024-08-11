import express from 'express';
import { addYear, getYearsByDegreeName, updateYearByName, deleteYearByName } from '../controllers/year.controller.js';

const router = express.Router();

router.post('/', addYear);
router.get('/:degreeName', getYearsByDegreeName);
router.put('/:name', updateYearByName);
router.delete('/:name', deleteYearByName);

export default router;