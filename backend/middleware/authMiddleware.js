import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    token = token.replace("Bearer ", ""); // Remove "Bearer" prefix if present
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};