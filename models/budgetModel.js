import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema(
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
    limitAmount: {
      type: Number,
      required: [true, "Budget limit is required"],
      min: [0, "Limit must be greater than zero"],
    },
    month: {
      type: String, // Store in YYYY-MM format
      required: true,
    },
  },

  { timestamps: true }

);

const budgetModel = mongoose.model('Budget', BudgetSchema)
export default budgetModel;
