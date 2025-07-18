import React, { useContext } from "react"
import { AuthContext } from "../src/context/AuthContext"

const Profile = () => {
  const { user } = useContext(AuthContext)

  return <div>{user && <h1>Welcome {user.username}</h1>}</div>
}

export default Profile
