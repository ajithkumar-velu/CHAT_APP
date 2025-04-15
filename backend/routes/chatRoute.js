import express from "express"
import { product } from "../middleware/protact.js"
import { addToGroup, createGroup, deleteGroup, getChat, postChat, removeFromGroup, renameGroup } from "../controller/chat.js"
const chatRoute = express.Router()

chatRoute.post('/', product, postChat)
chatRoute.get('/', product, getChat)
chatRoute.post('/group', product, createGroup)
chatRoute.delete('/deleteGroup/:chatId', product, deleteGroup)
chatRoute.post('/rename', product, renameGroup)
chatRoute.post('/groupRemove', product, removeFromGroup)
chatRoute.post('/groupAdd', product, addToGroup)

export default chatRoute