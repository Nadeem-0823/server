import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    if( !name || !email || !password ){
        return res.status(500).json({
            success: false,
            message: 'Please provide all fields'
        })
    }

    const userExists = await User.findOne({ email });
    if (userExists) 
        return res.status(400).json({ 
            success: false,
            message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ 
        success: true,
        message: 'User Login Successfully',
        _id: user.id, 
        name: user.name, 
        email: user.email, 
        token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Server error", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ 
        success: false,
        message: "User Not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" });

    res.status(200).json({ 
        success: true,
        message: 'User Login Successfully',
        _id: user.id, 
        name: user.name, 
        email: user.email, 
        token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Server error", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ 
        success: false,
        message: "User not found" });

    res.status(200).json({
      success:true,
      user });
  } catch (error) {
    res.status(500).json({ 
        success: false,
        message: "Server error", error });
  }
};
