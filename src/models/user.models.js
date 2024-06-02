import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String, //cloudinary
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
        type : mongoose.Schema.ObjectId,
        ref:"Video"
        }
    ],
    passwords:{
        type: String,
        required: [true,"Password is required"]
    },
    refreshtoken:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next();
   this.password=await bcrypt(this.password,11);
   next()
})

userSchema.methods.isPassCorr=async function(password){
    return await  bcrypt(password,this.password)
}

userSchema.methods.generateaccesstoken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN.EXPIRATION
        }
    )
}
userSchema.methods.generaterefreshtoken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN.EXPIRATION
        }
    )
}
export const User = mongoose.model("User",userSchema);