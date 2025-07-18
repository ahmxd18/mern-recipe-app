import Home from "../pages/Home"
import { AuthProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import AddRecipe from "../pages/AddRecipe"
import RecipeDetails from "../pages/RecipeDetails"
import EditRecipe from "../pages/EditRecipe"

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
