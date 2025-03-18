import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name should be atleast 3 characters long"],
        },
        lastName:{
            type:String,
            minlength:[3,"First name should be atleast 3 characters long"],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },
})

userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({id: this._id},process.env.JWT_SECRET, {expiresIn: "1d"});
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password,10)
}

const userModel=mongoose.model("User",userSchema)
export default userModel