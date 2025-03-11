import Income from '../models/incomeModel.js';

export const addIncome = async (req, res) => {

    const { source, amount, date } = req.body;

  try {
    
    if( !source || !amount || !date ){
        return res.status(500).json({
            success: false,
            message: 'Please provide all fields'
        })
    }

    const income = await Income.create({ userId: req.user.id, source, amount, date });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error adding income", error });
  }
};

export const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({
        success:true,
        income });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Error fetching income", error });
  }
};

