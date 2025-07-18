import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.js"
import recipeRoutes from "./routes/recipes.js"
import path from "path"

dotenv.config({ override: true })

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/recipes", recipeRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
