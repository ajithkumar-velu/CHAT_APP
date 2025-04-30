import express from "express"
import { product } from "../middleware/protact.js"
import { getAllUsers, getAuthUser, profileUpdate } from "../controller/user.js"

const userRoute = express.Router()

userRoute.get("/profile", product, getAuthUser)
userRoute.get("/users", product, getAllUsers)
userRoute.post("/update", product, profileUpdate)

export default userRoute