import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const product = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt
        if (!token) return res.status.json({message: "Your not Logged In"})

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if(!decode) return res.status.json({message: "Your not Logged In"})

        const user = await User.findById(decode.userId).select("-password")

        req.user = user
        next()
    } catch (error) {
        console.log("Error in Product error: ", error); 
        res.status(500).json({})
    }
}