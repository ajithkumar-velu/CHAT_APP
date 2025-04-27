import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

export const createMessage = async (req, res) => {
    try {
        const { message, chatId } = req.body
        if(!message || !chatId) return res.status(400).json({ message: "Message and chatId are required"})
        
        const newMessage = new Message({
            sender: req.user._id,
            message: message,
            chat: chatId
        })
        await newMessage.save()

        const chat = await Chat.findByIdAndUpdate(chatId,
            {latestMessage: newMessage._id},
            {new: true  }
        )
        const fullMessage = await Message.findById(newMessage._id)
        .populate("sender", "-password")
        .populate({
            path:"chat",
            populate: {path: "users groupAdmin", select:"-password"}
        })
        res.status(201).json(fullMessage)
    } catch (error) {
        console.log("Error in createMessage", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const allMessage = async (req, res) => {
    try {
        const {chatId} = req.params
        const messages = await Message.find({chat: chatId})
        .populate("sender", "-password")
        .populate("chat")
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in allMessage", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
// todo
export const clearChat = async (req, res) => {
    try {
        const {chatId} = req.params
        await Message.deleteMany({ chat: chatId})
        return res.status(200).json({ message: "Messages cleared"})
    } catch (error) {
        console.log("Error in clearChat", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}