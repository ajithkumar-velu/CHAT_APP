import express from 'express'
import { login, logout, register } from '../controller/auth.js'

const authRoute = express.Router()

authRoute.post("/login", login)
authRoute.post("/signup", register)
authRoute.get("/logout", logout)

export default authRoute