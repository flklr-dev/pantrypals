// Recipe.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    servingSize: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: [String], // Array of ingredient names or descriptions
        required: true,
    },
    cookingInstructions: {
        type: [String], // Array of instructions in order
        required: true,
    },
    cookingTime: {
        type: Number, // Time in minutes
        required: true,
    },
    authorNotes: {
        type: String, // Optional notes from the author
    },
    sharingOption: {
        type: String,
        enum: ["public", "private"], // Restrict to these options
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User",
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model("Recipe", recipeSchema);
