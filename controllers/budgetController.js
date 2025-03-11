import Budget from '../models/budgetModel.js';

export const setBudget = async (req, res) => {

    const { category, limitAmount, month } = req.body;

  try {

    if( !category || !limitAmount || !month ){
        return res.status(500).json({
            success: false,
            message: 'Please provide all fields'
        })
    }
    
    const budget = await Budget.create({ userId: req.user.id, category, limitAmount, month });
    res.status(201).json({
        success:true,
        budget });
  } catch (error) {
    res.status(500).json({
        success:false, 
        message: "Error setting budget", error });
  }
};

export const getBudget = async (req, res) => {

  try {

    const budget = await Budget.find({ userId: req.user.id });
    res.status(200).json({
        success:true,
        budget });
  } catch (error) {
    res.status(500).json({
        success:false, 
        message: "Error fetching budget", error });
  }
};

 