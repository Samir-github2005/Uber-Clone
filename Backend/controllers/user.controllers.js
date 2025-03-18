import userModel from "../models/userModels.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlackListToken from "../models/blackListToken.models.js";

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullName, email, password } = req.body;
        const isUserAlreadyExists= await userModel.findOne({email})
        if(isUserAlreadyExists){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await userModel.hashPassword(password);
        const user = await createUser({ firstName: fullName.firstName, lastName: fullName.lastName, email, password: hashPassword });
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const loginUser= async (req,res,next)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email,password}=req.body
        const user= await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(401).json({message:'Invalid email or password'}) 
        }
        const passwordMatch = await user.comparePassword(password)
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid email or password'})      
        }
        const token = user.generateAuthToken()
        res.cookie('token', token)
        res.status(200).json({user,token})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const logoutUser= async (req,res,next) => {
    try {
    res.clearCookie('token')
    const token= req.cookies.token || req.headers.authorization.split(" ")[1]
    await BlackListToken.create({token})
    res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { registerUser, loginUser, getUserProfile, logoutUser };
