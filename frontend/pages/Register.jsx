import { useContext, useState } from "react"
import { AuthContext } from "../src/context/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      navigate("/")
    } catch (error) {
      console.error("Registration Error:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-6xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3 justify-between ">
          <label className="text-2xl font-semibold ">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 w-full text-2xl font-semibold border rounded"
          />
        </div>
        <div className="flex gap-3 justify-between ">
          <label className="text-2xl font-semibold ">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 w-full text-2xl font-semibold border rounded"
          />
        </div>
        <div className="flex gap-3 justify-between ">
          <label className="text-2xl font-semibold ">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 w-full text-2xl font-semibold border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded hover:bg-blue-600 px-4 py-2"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
