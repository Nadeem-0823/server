import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
   
      token = req.headers.authorization.split(" ")[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ 
        success:false,
        message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ 
        success:false,
        message: "Not authorized, no token provided" });
  }
};

