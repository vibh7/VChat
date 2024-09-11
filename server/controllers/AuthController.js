import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import { compare } from "bcrypt"

const maxAge = 10909000000
const creteToken = (email,userId) =>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge})
}


export const signup = async (req,res,next) =>{
    try{
        const {email,password} = req.body
    
        if(!email || !password){
            return res.status(400).send("Email and password is required")
        }
        const user = await User.create({email,password}) 
        res.cookie('jwt',creteToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None",
        })

        return res.status(201).json({
            user : {
                id : user.id,
                email : user.email,
                profileSetup : user.profileSetup,
        }
        })
    }
    catch(err) {
        console.log({err})
        return res.status(500).send("Internal server error")
    }
}


export const login = async (req,res,next) =>{
    try{
        const {email,password} = req.body
    
        if(!email || !password){
            return res.status(400).send("Email and password is required")
        }
        const user = await User.findOne({email}) 
        if(!user){
            res.status(401).send("User with given email not found")
        }
        const auth = await compare(password,user.password)
        res.cookie('jwt',creteToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None",
        })

        return res.status(201).json({
            id : user.id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            image : user.image,
            color : user.color, 
            profileSetup : user.profileSetup,
        })
    }
    catch(err) {
        console.log({err})
        return res.status(500).send("Internal server error")
    }
}


export const getUserInfo = async (req,res,next) =>{
    try{
        const userData = await User.findById(req.userId)
        if(!userData){
            res.status(401).send("User with given id not found")
        }
        return res.status(200).json({
            id : userData.id,
            email : userData.email,
            firstName : userData.firstName,
            lastName : userData.lastName,
            image : userData.image,
            color : userData.color, 
            profileSetup : userData.profileSetup,
        })
    }
    catch(err) {
        console.log({err})
        return res.status(500).send("Internal server error")
    }
}
