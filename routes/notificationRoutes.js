import express from 'express';
import {
    getNotification
} from '../controllers/notificationController.js'
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/get-notification", protect, getNotification);

export default router;