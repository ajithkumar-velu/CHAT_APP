import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

// add chat
export const postChat = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) return res.status(400).json({ message: "UserId is required" })

        const existingChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: req.user._id } } }
            ]
        }).populate("users", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "-password"
                }
            })

        if (existingChat.length == 0) {
            const newChat = new Chat({
                chatName: "Messanger",
                isGroupChat: false,
                users: [req.user._id, userId]
            })
            await newChat.save()
            const chat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password")
            return res.status(201).json(chat)
        } else {
            const chat = existingChat[0]
            return res.status(200).json(chat)
        }
    } catch (error) {
        console.log("Error in PostChat", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
// contact section with latest message informarion
export const getChat = async (req, res) => {
    try {
        const chat = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).sort({ updatedAt: -1 })
            .populate("users", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "-password"
                }
            }).populate("groupAdmin", "-password")

        res.status(200).json(chat)
    } catch (error) {
        console.log("Error in getChat", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const createGroup = async (req, res) => {
    try {
        const users = req.body.users
        users.push(req.user._id)
        if (!req.body.users || !req.body.chatName) return res.status(400).json({ message: "users and name are required" })

        if (users.length < 2) return res.status(400).json({ message: "At least 2 users are required to create a group" })

        const groupChat = new Chat({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: req.body.users,
            groupAdmin: req.user._id,
            description: req.body.description
        })
        await groupChat.save()

        const groups = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        res.status(201).json(groups)

    } catch (error) {
        console.log("Error in createGroup", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const deleteGroup = async (req, res) => {
    try {
        const chatId = req.params.chatId
        await Message.deleteMany({ chat: chatId })
        await Chat.deleteOne({ _id: chatId })
        return res.status(200).json({ message: "Group deleted successfully" })
    } catch (error) {
        console.log("Error in deleteGroup", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const renameGroup = async (req, res) => {
    try {
        const { name, chatId } = req.body
        if (!name || !chatId) return res.status(400).json({ message: "name and chatId are required" })

        const chat = await Chat.findByIdAndUpdate(
            chatId, {
            chatName: name
        },
            { new: true }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!chat) return res.status(404).json({ message: "Group not found" })
        res.status(200).json(chat)
    } catch (error) {
        console.log("Error in renameGroup", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const removeFromGroup = async (req, res) => {
    try {
        const { userId, chatId } = req.body
        if (!userId || !chatId) return res.status(400).json({ message: "userId and chatId are required" })

        const chat = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId }
        },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!chat) return res.status(400).json({ message: "User not found in the group" })
        return res.status(200).json(chat)

    } catch (error) {
        console.log("Error in removeFromGroup", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
// todo
export const addToGroup = async (req, res) => {
    try {
        const { userIds, chatId } = req.body
        if (!userIds || !chatId) return res.status(400).json({ message: "userId and chatId are required" })

        const chat = await Chat.findByIdAndUpdate(chatId,
            {
                $addToSet: {
                    users: { $each: userIds }
                }
            },
            { new: true }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!chat) return res.status(400).json({ message: "Chat not found" })
        res.status(200).json(chat)

    } catch (error) {
        console.log("Error in addToGroup", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}