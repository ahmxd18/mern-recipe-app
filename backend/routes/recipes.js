import express from "express"
import Recipe from "../models/Recipe.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Create a Recipe
router.post("/create-recipe", protect, async (req, res) => {
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body

  try {
    if (
      !title ||
      !ingredients ||
      !instructions ||
      !category ||
      !photoUrl ||
      !cookingTime
    )
      return res.status(400).json({ message: "Please fill all fields" })
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      category,
      photoUrl,
      cookingTime,
      createdBy: req.user._id,
    })
    res.status(201).json(recipe)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// Get Recipes
router.get("/", async (req, res) => {
  const { category } = req.query
  try {
    const query = category ? { category } : {}
    const recipes = await Recipe.find(query)
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// Get a Recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ message: "Recipe not found" })
    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error })
  }
})

// Update a Recipe
router.put("/:id", protect, async (req, res) => {
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ message: "Recipe not found." })
    if (recipe.createdBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not Authorized" })
    recipe.title = title || recipe.title
    recipe.ingredients = ingredients || recipe.ingredients
    recipe.instructions = instructions || recipe.instructions
    recipe.category = category || recipe.category
    recipe.photoUrl = photoUrl || recipe.photoUrl
    recipe.cookingTime = cookingTime || recipe.cookingTime
    const updatedRecipe = await recipe.save()
    res.json(updatedRecipe)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete a Recipe
router.delete("/:id", protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ message: "Recipe not found" })
    if (recipe.createdBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not Authorized" })
    await recipe.deleteOne()
    res.json({ message: "Recipe deleted" })
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

export default router
