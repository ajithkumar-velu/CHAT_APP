import getentateToken from "../config/genterateToken.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { fullname, email, password, about } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400).json({ message: "User already exist" })

        const slat = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, slat)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            about
        })
        if (newUser) {
            getentateToken(newUser._id, res)
            await newUser.save()
            return res.status(200).json({ message: "Register Successfull", fullname: newUser.fullname, email: newUser.email, about: newUser.about, profile: newUser.profile })
        }
    } catch (error) {
        console.log("Error in register", error);
        res.statas(500).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        getentateToken(user._id, res)
        
        return res.status(200).json({ message: "Login Successfull", fullname: user.fullname, email: user.email, about: user.about, profile: user.profile })

    } catch (error) {
        console.log("Error in login", error);
        res.statas(500).json({ message: error.message })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, sameSite: 'none', secure: true})
        res.status(200).json({message: "logout successfully"})
    } catch (error) {
        console.log("Error in logout", error);
        res.statas(500).json({ message: error.message })
    }
}