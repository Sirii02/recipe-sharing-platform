const express = require("express");
const multer = require("multer");
const path = require("path");
const Recipe = require("../models/Recipe");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Uploading to: ", path.join(__dirname, "../uploads")); // Debugging log
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log("Uploading File: ", file.originalname); // Debugging log
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
        }
        cb(null, true);
    }
});

// Access io from the app instance
const getIo = (req) => req.app.get("io");

// Create a Recipe (with Image Upload Support)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;

        // Validate required fields
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Title, ingredients, and instructions are required." });
        }

        // Get image path (if uploaded)
        const image = req.file ? `/uploads/${req.file.filename}` : "";

        // Create new recipe
        const newRecipe = new Recipe({
            title,
            ingredients: JSON.parse(ingredients), // Convert stringified array
            instructions,
            image,
            user: req.user.id,
        });

        // Save recipe to the database
        await newRecipe.save();

        // Emit event for new recipe
        const io = getIo(req);
        io.emit("recipeCreated", newRecipe);

        res.status(201).json(newRecipe);
    } catch (err) {
        console.error("Error creating recipe:", err);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Get all Recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("user", "username");
        res.json(recipes);
    } catch (err) {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ message: "Failed to fetch recipes." });
    }
});

// Get a single Recipe
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("user", "username");
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }
        res.json(recipe);
    } catch (err) {
        console.error("Error fetching recipe:", err);
        res.status(500).json({ message: "Failed to fetch recipe." });
    }
});

// Update a Recipe (Protected)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        if (recipe.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this recipe." });
        }

        const { title, ingredients, instructions, image } = req.body;

        // Update only provided fields
        if (title) recipe.title = title;
        if (ingredients) recipe.ingredients = ingredients;
        if (instructions) recipe.instructions = instructions;
        if (image) recipe.image = image;

        const updatedRecipe = await recipe.save();

        // Emit event for updated recipe
        const io = getIo(req);
        io.emit("recipeUpdated", updatedRecipe);

        res.json(updatedRecipe);
    } catch (err) {
        console.error("Error updating recipe:", err);
        res.status(500).json({ message: "Failed to update recipe." });
    }
});

// Delete a Recipe (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        if (recipe.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this recipe." });
        }

        await recipe.deleteOne();

        // Emit event for deleted recipe
        const io = getIo(req);
        io.emit("recipeDeleted", req.params.id);

        res.json({ message: "Recipe deleted successfully." });
    } catch (err) {
        console.error("Error deleting recipe:", err);
        res.status(500).json({ message: "Failed to delete recipe." });
    }
});

module.exports = router;