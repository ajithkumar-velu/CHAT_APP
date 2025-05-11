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
import { v2 as cloudinary } from "cloudinary"
// import { createUsers } from "./test.js"
import { Server } from 'socket.io'
import { createServer } from 'http'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

connectDb()
// createUsers()
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }))
app.use(cookieParser())
app.use(express.json({ limit: '5mb' }))
app.use(cors({
	origin: [process.env.FRONTEND_URL],
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
		origin: [process.env.FRONTEND_URL],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}
})

let onlineUsers = new Map();


io.on("connection", (socket) => {
	console.log("New client connected:", socket.id);

	// Join user
	socket.on("setup", (userData) => {
		onlineUsers.set(userData._id, socket.id);
		console.log(onlineUsers);
		io.emit("online users", Array.from(onlineUsers.keys()));
		socket.join(userData._id);
		console.log("User joined room:", userData.fullname);
		socket.emit("connected");
	});

	// Join specific chat room
	socket.on("join chat", (room) => {
		if (socket.currentRoom) {
			if (socket.currentRoom === room._id) {
				console.log(`User already in Room: ${room._id}`);
				return;
			}
			socket.leave(socket.currentRoom);
			console.log(`User left Room: ${socket.currentRoom}`);
		}
		socket.join(room._id);
		socket.currentRoom = room._id;
		console.log("User joined Room:", room._id);
	});

	// Typing indicators
	socket.on("typing", (room, user) => {
		socket.to(room._id).emit("typing", room, user)
	}
	);
	socket.on("stop typing", (room, user) => {
		console.log(room.chatName);
		socket.to(room._id).emit("stop typing", room, user)
	});

	// Send message
	socket.on("new message", async (newMessage) => {
		const chat = newMessage.chat;
		if (!chat.users) return console.log("Chat users not defined");

		chat.users.forEach((user) => {
			if (user._id === newMessage.sender._id) return;
			socket.to(user._id).emit("message received", newMessage);
		});
	});

	// clear chat
	socket.on("clear chat", (room, username)=>{
		// console.log(room);
		socket.to(room._id).emit("clear chat", room, username	)
	})
	socket.on("update profile", (chat)=>{
		socket.to(chat._id).emit("update profile", chat)
	})

	socket.on("delete group", (chat, fullname)=>{
		io.emit("delete group", chat, fullname)
	})
	socket.on("create group", (chat, fullname)=>{
		io.emit("create group", chat, fullname)
	})
	socket.on("removeFromGroup", (chat, removeUser)=>{
		io.emit("removeFromGroup", chat, removeUser)
	})

	socket.on("disconnect", () => {
		for (let [userId, id] of onlineUsers.entries()) {
			if (id === socket.id) {
				onlineUsers.delete(userId);
				break;
			}
		}
		io.emit("online users", Array.from(onlineUsers.keys()));
		console.log("Client disconnected:", socket.id);
	});
});
server.listen(PORT, () => {
	console.log(`Server is running port: ${PORT}`);
})