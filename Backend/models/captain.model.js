import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema=mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength:[3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase:true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    socketId: {
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minlength:[3, 'color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minlength:[3, 'plate must be at least 3 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true,
        },
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    return token
}

captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function(password){
    return bcrypt.hash(password,10)
}

const captainModel=mongoose.model("Captain",captainSchema)

export default captainModel
