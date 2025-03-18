import captainModel from "../models/captain.model.js";

const createCaptain=async({
    firstName, lastName, email, password, color, plate, capacity, vehicleType
})=>{
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("Please fill all the fields");
    }
    const captain= captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}

export {createCaptain}