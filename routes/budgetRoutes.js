import express from 'express';
import {
    setBudget, 
    getBudget
} from '../controllers/budgetController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/setBudget", protect, setBudget);
router.get("/getBudget", protect, getBudget);

export default router;