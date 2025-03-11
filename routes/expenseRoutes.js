import express from 'express';
import {
    addExpense, 
    getExpense, 
    updateExpense, 
    deleteExpense
} from '../controllers/expenseController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/addExpense", protect, addExpense);
router.get("/getExpense", protect, getExpense);
router.put("/updateExpense/:id", protect, updateExpense);
router.delete("/deleteExpense/:id", protect, deleteExpense);

export default router;