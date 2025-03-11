import express from 'express';
import {
    addIncome, 
    getIncome
} from '../controllers/incomeController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/addIncome", protect, addIncome);
router.get("/getIncome", protect, getIncome);

export default router;