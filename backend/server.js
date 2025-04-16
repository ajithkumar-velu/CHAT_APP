import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import connectDb from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import chatRoute from "./routes/chatRoute.js"
import messageRoute from "./routes/messageRoute.js"
import userRoute from "./routes/userRoute.js"
import { createUsers } from "./test.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


connectDb()
// createUsers()
app.use(bodyParser.urlencoded({ extended: true, limit: "6mb"}))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://chat-app-frontend-qss7.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/api/auth", authRoute)
app.use("/api/chat", chatRoute)
app.use("/api/message", messageRoute )
app.use("/api/user", userRoute )

app.get("", (req, res)=>{
    res.send("Check the server")
})
app.listen(PORT, ()=>{
    console.log(`Server is running port: ${PORT}`);
})