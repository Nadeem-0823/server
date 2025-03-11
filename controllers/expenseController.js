import Expense from '../models/expenseModel.js';

export const addExpense = async (req, res) => {

  const { category, amount, date, description } = req.body;
  
  try {

    if( !category || !amount || !date || !description ){
        return res.status(500).json({
            success: false,
            message: 'Please provide all fields'
        })
    }

    const expense = await Expense.create({ userId: req.user.id, category, amount, date, description });
    res.status(201).json({
      success:true,
      expense });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error adding expense", error });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({
      success:true,
      expenses });
  } catch (error) {
    res.status(500).json({
        success:false, 
        message: "Error fetching expenses", error });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success:false, 
        message: "Expense not found" });
    }

    Object.assign(expense, req.body);
    await expense.save();
    res.status(200).json({
      success:true,
      expense });
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: "Error updating expense", error });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.userId.toString() !== req.user.id) {
      return res.status(404).json({ 
        success:false,
        message: "Expense not found" });
    }

    await expense.deleteOne();
    res.status(200).json({ 
        success: true,
        message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error deleting expense", error });
  }
};
