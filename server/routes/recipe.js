const express = require("express");
const Recipe = require("../models/Recipe");
const { verifyToken } = require("./authMiddleware");


const router = express.Router();

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, description, image, category, servingSize, ingredients, cookingInstructions, cookingTime, authorNotes, sharingOption } = req.body;

        const recipe = new Recipe({
            title,
            description,
            image,
            category,
            servingSize,
            ingredients,
            cookingInstructions,
            cookingTime,
            authorNotes,
            sharingOption,
            author: req.user.userId // Set the author as the logged-in user
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all public recipes
router.get("/public", async (req, res) => {
    try {
        const recipes = await Recipe.find({ sharingOption: "public" }).populate("author", "name email");
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recipes by user
router.get("/my-recipes", verifyToken, async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.user.userId });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single recipe by ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("author", "name email");
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        
        // Check if the recipe is private and if the user is not the author
        if (recipe.sharingOption === "private" && (!req.user || recipe.author._id.toString() !== req.user.userId)) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a recipe
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        // Check if the logged-in user is the author of the recipe
        if (recipe.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You can only edit your own recipes" });
        }

        Object.assign(recipe, req.body);
        await recipe.save();
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a recipe
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        // Check if the logged-in user is the author of the recipe
        if (recipe.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You can only delete your own recipes" });
        }

        await recipe.remove();
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
