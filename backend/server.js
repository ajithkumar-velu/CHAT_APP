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
// import { createUsers } from "./test.js"
import { Server } from 'socket.io'
import { createServer } from 'http'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


connectDb()
// createUsers()
app.use(bodyParser.urlencoded({ extended: true, limit: "6mb" }))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://chat-app-frontend-qss7.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
const server = createServer(app);

app.use("/api/auth", authRoute)
app.use("/api/chat", chatRoute)
app.use("/api/message", messageRoute)
app.use("/api/user", userRoute)

app.get("", (req, res) => {
    res.send("Check the server")
})


const io = new Server(server, {
    cors: {
        // origin: "http://localhost:5173",
        origin: ["https://chat-app-frontend-qss7.onrender.com"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Join user and message send to client
    const setupHandler = (userId) => {
        
        if (!socket.hasJoined) {
            socket.join(userId);
            socket.hasJoined = true;
            console.log("User joined:", userId);
            socket.emit("connected");
        }
    };
    const newMessageHandler = (newMessageReceived) => {
        console.log(newMessageReceived);
        
        let chat = newMessageReceived?.chat;
        chat?.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id) return;
            console.log("Message received by:", user._id);
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    };  

    socket.on("setup", setupHandler);
    socket.on("new message", newMessageHandler);

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        socket.off("setup", setupHandler);
        socket.off("new message", newMessageHandler);
    });
});
server.listen(PORT, () => {
    console.log(`Server is running port: ${PORT}`);
})