import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <h1>Recipes</h1>
        </Link>
        <div className="flex gap-x-4">
          {user ? (
            <div className="flex gap-x-3">
              <Link to="/profile">{user.username}</Link>
              <Link to="/add-recipe">Add a Recipe</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
