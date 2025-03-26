import express from 'express';
import { useMeal } from '../controller/meal.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/use', auth, useMeal);

export default router;