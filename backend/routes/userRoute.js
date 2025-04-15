import express from "express"
import { product } from "../middleware/protact.js"
import { getAllUsers, getAuthUser } from "../controller/user.js"

const userRoute = express.Router()

userRoute.get("/profile", product, getAuthUser)
userRoute.get("/users", product, getAllUsers)

export default userRoute