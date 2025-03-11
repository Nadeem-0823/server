import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      enum: ["Salary", "Freelancing", "Business", "Investments", "Other"]
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
    }
  },

  { timestamps: true }

);

const incomeModel = mongoose.model("Income", IncomeSchema)
export default incomeModel;
