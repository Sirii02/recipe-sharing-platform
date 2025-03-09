const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body; // Add 'name'

        // Trim whitespace
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Check if user already exists
        const userExists = await User.findOne({ email: trimmedEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            name,  // Include 'name'
            username,
            email: trimmedEmail,
            password: trimmedPassword,
        });

        await newUser.save();

        console.log("User registered successfully:", newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trim whitespace from email and password
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log("Received email:", trimmedEmail);
        console.log("Received password:", trimmedPassword);

        // Find user by email
        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            console.log("User not found in database");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("User found in DB:", user);
        console.log("Stored hashed password:", user.password);

        // Compare entered password with stored hashed password using matchPassword
        const isMatch = await user.matchPassword(trimmedPassword);
        console.log("Comparison Result:", isMatch);

        if (!isMatch) {
            console.log("Password comparison failed");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: err.message });
    }
};

// Get Logged-in User Data
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, getMe };