import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

const register = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const userFound = await User.findOne({email})
        if(userFound) 
            return res.status(400).json([{
                    field: "email",
                    message: 'The email already exists' 
                }])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({username, email, password: passwordHash})
        const userSaved = await newUser.save()

        const token = await createAccessToken({id: newUser._id})

        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({message: "Username or password wrong"})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({message: "Username or password wrong"})

        const token = await createAccessToken({id: userFound._id})

        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if(!token) return res.status(401).json({ message: 'Unauthorized'})

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if(error) return res.status(401).json({ message: 'Unauthorized' })

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(400).json({ message: 'User not found'})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}

const logout = (req, res) => {
    res.cookie('token', "", {expires: new Date(0)})
    return res.sendStatus(200)
}

const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"})

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}

export {login, register, verifyToken, logout, profile}