import BlackListToken from "../models/blackListToken.models.js";
import captainModel from "../models/captain.model.js";
import {createCaptain} from "../services/captain.service.js";
import { validationResult } from "express-validator";

const registerCaptain=async(req,res,next)=>{
    const error= validationResult(req)
    if(!error){
        return res.status(400).json({error:error.array()})
    }

    const {fullName, vehicle, email, password}=req.body
    const isCaptainAlreadyExists = await captainModel.findOne({email})
    if(isCaptainAlreadyExists){
        return res.status(400).json({error:"Captain already exists with this email."})
    }
    const hashPassword= await captainModel.hashPassword(password)
    const captain=await createCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email:email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType      
    })
const token= captain.generateAuthToken()
return res.status(200).json({captain,token})
}

const loginCaptain=async(req,res,next)=>{
    try {
        const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {email,password}=req.body
    const captain=await captainModel.findOne({email}).select("+password")
    if(!captain){
        return res.status(400).json({error:"Invalid email or password."})
    }
    const isMatched=await captain.comparePassword(password)
    if(!isMatched){
        return res.status(400).json({error:"Invalid email or password."})
    }
    const token= captain.generateAuthToken()
    res.cookie('token', token); // Set the cookie first
    return res.status(200).json({ captain, token }); // Then send the response

    } catch (error) {
        console.log(error);
    }
}

const logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await BlackListToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCaptainProfile=async(req,res,next)=>{
    res.status(200).json({captain: req.captain})
}

export {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain}
