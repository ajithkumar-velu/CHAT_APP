import User from "../models/User.js";

export const getAuthUser = async (req, res) => {
    try {
        if(!req.user) return res.status(404).json({ message: "User not found"})
        res.status(200).json({user: req.user})
    } catch (error) {
        console.log("Error in getAuthUser", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const allUsera = await User.find({_id: {$ne: req.user._id}})
        .populate("-password")
        .sort({_id: -1})
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Error in getAllUsers", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}