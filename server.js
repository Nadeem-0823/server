import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

// Import Routes
import userRoutes from './routes/userRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/notification", notificationRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT} on ${process.env.NODE_ENV} Mode`.bgYellow.red);
});
