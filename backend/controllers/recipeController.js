const Recipe = require("../models/Recipe");

// Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, imageUrl } = req.body;
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            imageUrl,
            user: req.user.id, // Associate recipe with logged-in user
        });

        const savedRecipe = await newRecipe.save();

        // Emit event for new recipe
        const io = req.app.get("io"); // Get the io instance
        io.emit("recipeCreated", savedRecipe);

        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error creating recipe", error: error.message });
    }
};

// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("user", "username email"); // Populate user details
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
};

// Get recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("user", "username email");
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error: error.message });
    }
};

// Update recipe
const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Emit event for updated recipe
        const io = req.app.get("io"); // Get the io instance
        io.emit("recipeUpdated", updatedRecipe);

        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Emit event for deleted recipe
        const io = req.app.get("io"); // Get the io instance
        io.emit("recipeDeleted", req.params.id);

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
};

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };