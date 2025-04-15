import express from "express"
import { product } from "../middleware/protact.js"
import { allMessage, clearChat, createMessage } from "../controller/message.js"

const messageRoute = express.Router()

messageRoute.post("/", product, createMessage)
messageRoute.get("/:chatId", product, allMessage)
messageRoute.get("/clearChat/:chatId", product, clearChat)

export default messageRoute