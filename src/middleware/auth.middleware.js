import ApiError from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export default verifyJWT = asynchandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accestoken || req.header("Authorization")?.replace("Bearer ","")
        if(!token) throw new ApiError(401,"Unauthorized request");
        const decodetoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decodetoken._id).select("-password -refreshtoken")
        if(!user) throw new ApiError(401,"Invalid access token")
        req.user =  user;
       next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})