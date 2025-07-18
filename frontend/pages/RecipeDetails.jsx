import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../src/context/AuthContext"
import { Link } from "react-router-dom"

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDelete = async () => {
    setLoading(true)
    const confirmation = window.confirm(
      "Are you sure you want to delete this Recipe?"
    )
    try {
      if (confirmation) {
        await axios.delete(`/api/recipes/${id}`)
        navigate("/")
      }
    } catch (err) {
      setError(err)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // const handleEdit = async () => {
  //   setLoading(true)
  //   try {
  //   } catch (err) {}
  // }

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/recipes/${id}`)
        setRecipe(res.data)
      } catch (err) {
        setError(err)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  if (loading || !recipe) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg relative ">
      {recipe.photoUrl && (
        <img
          src={recipe.photoUrl}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
      )}
      <h1>{recipe.title}</h1>
      <p>Category: {recipe.category} </p>
      <p>Cooking Time: {recipe.cookingTime} minutes</p>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ing, ind) => (
          <li key={ind}>{ing}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <p>{recipe.instructions}</p>
      {user && user._id === recipe.createdBy && (
        <div className="absolute top-5 right-5 flex flex-col gap-1 ">
          <Link to={`/edit-recipe/${id}`}>
            <button className="bg-gray-500 text-white rounded px-3 py-1 shadow-md hover:cursor-pointer hover:bg-gray-800">
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-gray-500 text-white rounded px-3 py-1 shadow-md hover:cursor-pointer hover:bg-gray-800"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default RecipeDetails
