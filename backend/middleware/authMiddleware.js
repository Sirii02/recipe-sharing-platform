const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    // Check if the Authorization header is present and starts with "Bearer"
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch the user from the database based on the user ID from the token
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            // If no user is found, return authorization failed
            return res.status(401).json({ message: "User not found, authorization failed" });
        }

        // If everything is fine, proceed to the next middleware
        next();
    } catch (error) {
        // Log the error for better debugging
        console.error("Authorization error:", error);

        // Handle specific token errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired, please log in again" });
        }

        // For other errors (invalid token or any other issue), return a generic error
        return res.status(401).json({ message: "Invalid token, authorization failed" });
    }
};

module.exports = authMiddleware;