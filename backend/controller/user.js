import User from "../models/UserModel.js";

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
        const allUsers = await User.find({_id: {$ne: req.user._id}})
        .select("-password")
        .sort({_id: 1})
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Error in getAllUsers", error);
        res.status(500).json({ message: "Internal server Error" })
    }
}
// todo
export const profileUpdate = async(req, res)=>{
    try {
        const {fullname, email, about} = req.body
        if(!fullname && !email && !about) return res.status(400).json({message: "Reqired field"})
        const updatedFields = {}
        if(fullname) updatedFields.fullname = fullname
        if(email) updatedFields.email = email
        if(about) updatedFields.about = about
        const userInfo = await User.findByIdAndUpdate(
            req.user._id, 
            {$set: updatedFields},
            {new: true, runValidators: true}
        ).select("-password")
        // res.status(200).json(userInfo)
        return res.status(200).json({ message: "Profile updated", userInfo})
    } catch (error) {
        console.log("Error in profileUpdate", error.message);
        res.status(500).json("Internal Server Error")
    }
}