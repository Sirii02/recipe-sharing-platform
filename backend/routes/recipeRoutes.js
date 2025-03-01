import express from "express";
import Recipe from "../models/Recipe.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure correct import

const router = express.Router();

// Create Recipe (Protected)
router.post("/", protect, async (req, res, next) => {
    try {
        const { title, ingredients, instructions, image } = req.body;

        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            image,
            createdBy: req.user.id
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        next(err); // Pass error to express error handler
    }
});

// Get All Recipes
router.get("/", async (req, res, next) => {
    try {
        const recipes = await Recipe.find().populate("createdBy", "username");
        res.json(recipes);
    } catch (err) {
        next(err);
    }
});

// Get Recipe by ID
router.get("/:id", async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("createdBy", "username");
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

// Update Recipe (Protected)
router.put("/:id", protect, async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this recipe" });
        }

        Object.assign(recipe, req.body);
        await recipe.save();

        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

// Delete Recipe (Protected)
router.delete("/:id", protect, async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this recipe" });
        }

        await recipe.deleteOne();
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        next(err);
    }
});

export default router;