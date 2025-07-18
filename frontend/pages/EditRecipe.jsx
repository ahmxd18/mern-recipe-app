import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: "",
  })

  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    handleInputChange("ingredients", newIngredients)
    const lastIngredient = formData.ingredients[formData.ingredients.length - 1]
    if (error && lastIngredient.trim() !== "") {
      setError("")
    }
  }

  const addIngredient = () => {
    const lastIngredient = formData.ingredients[formData.ingredients.length - 1]
    if (lastIngredient.trim() !== "") {
      setError("")
      handleInputChange("ingredients", [...formData.ingredients, ""])
    } else {
      setError("Please fill in the last ingredient before adding a new one")
    }
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index)
      handleInputChange("ingredients", newIngredients)
      const lastIngredient =
        formData.ingredients[formData.ingredients.length - 1]
      if (error && lastIngredient.trim() !== "") {
        setError("")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await axios.put(`/api/recipes/${id}`, {
        title: formData.title,
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
        instructions: formData.instructions,
        category: formData.category,
        photoUrl: formData.photoUrl,
        cookingTime: formData.cookingTime
          ? Number(formData.cookingTime)
          : undefined,
      })
      navigate("/")
    } catch (err) {
      setError("Failed to add recipe", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/recipes/${id}`)
        setFormData({
          title: res.data.title,
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
          category: res.data.category,
          photoUrl: res.data.photoUrl,
          cookingTime: res.data.cookingTime,
        })
      } catch (err) {
        setError(err)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  if (!formData) return <div>Loading...</div>

  return (
    <div className="flex-col">
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="w-full p-2 border rounded"
                required
              />
              {formData.ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleInputChange("instructions", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="BreakFast">BreakFast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div>
          <label>Cooking Time</label>
          <input
            type="number"
            value={formData.cookingTime}
            onChange={(e) => handleInputChange("cookingTime", e.target.value)}
            placeholder="in minutes"
            className="w-full p-2 border rounded"
            min={0}
            required
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type="text"
            value={formData.photoUrl}
            onChange={(e) => handleInputChange("photoUrl", e.target.value)}
            placeholder="url"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed " : ""
          }`}
        >
          {loading ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  )
}

export default EditRecipe
