import { populate } from "dotenv";
import Chat from "../models/chat.js";
import Message from "../models/message.js";

export const createMessage = async (req, res) => {
    try {
        const { message, chatId } = req.body
        if(!message) return req.status(400).json({ message: "Message is required"})
        
        const newMessage = new Message({
            sender: req.user._id,
            message: message,
            chat: chatId
        })
        await newMessage.save()

        const chat = await Chat.findByIdAndUpdate(chatId,
            {$push: {latestMessage: newMessage._id}},
            {new: true  }
        )
        const fullMessage = await Message.findById(newMessage._id)
        .populate("sender", "-password")
        .populate({
            path:"chat",
            populate: {path: "users groupAdmin", select:"-password"}
        })
    } catch (error) {
        console.log("Error in createMessage", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const allMessage = async (req, res) => {
    try {
        const {chatId} = req.body
        const messages = await Message.find({chat: chatId})
        .populate("sender", "-password")
        .populate("chat")
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in allMessage", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const clearChat = async (req, res) => {
    try {
        const {chatId} = req.body
        await Message.deleteMany({ chat: chatId})
        return res.status(200).json({ message: "Messages cleared"})
    } catch (error) {
        console.log("Error in clearChat", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}