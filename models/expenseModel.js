import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"]
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be greater than zero"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now
    },
    description: {
      type: String,
      trim: true
    },
    receiptImage: {
      type: String, 
      default: null
    },
  },

  { timestamps: true }

);

const expenseModel = mongoose.model('Expense', ExpenseSchema);
export default expenseModel;


