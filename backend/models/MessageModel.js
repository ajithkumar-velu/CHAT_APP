import mongoose from "mongoose";

const messageSchma = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchma)
export default Message