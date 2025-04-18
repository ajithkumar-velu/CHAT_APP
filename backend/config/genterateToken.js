import jwt from 'jsonwebtoken'
const getentateToken = async (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: process.env.SAMESITE 
        
    })
    return token
}
export default getentateToken