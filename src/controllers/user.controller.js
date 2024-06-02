import {asynchandler} from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req,res) =>{
    //get user details from frontend
    //validation checks- fields not empty, email correct format etc
    //avatar not empty
    //upload them to cloudinary
    //create user object- create entry in db
    console.log("req.body-",req.body);
    const {fullname,email,username,passwords}=req.body;
    if(
        [fullname,email,username,passwords].some((e)=>e?.trim()==="")
    ){
        throw new ApiError(400,"Fields can't be empty");
    }
    if(!email?.includes('@')) throw new ApiError(401,"Invalid email");

    const alreadyuser =await User.findOne({
        $or:[{username},{email}]
    })
    if(alreadyuser) throw new ApiError(402,"User exists");
    console.log("req.files-",req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage[0]?.path;
    if(!avatarLocalPath) throw new ApiError(400,"Avatar is needed"); 
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverimageLocalPath);

    if(!avatar) throw new ApiError(402,"File not uploaded on cloudinary");

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        passwords,
        username:username.toLowerCase(),
    })
    console.log(user);
    const creationdone = await User.findById(user._id)?.select(
        "-passwords -refreshtoken"
    )
    if(!creationdone){
        throw new ApiError(401,"Error in creating User");
    }

    return res.status(201).json(
        new ApiResponse(200,creationdone,"User Created Succesfully")
    )
})

export {registerUser};