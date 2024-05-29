import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadOnCloudinary = async(localfilepath)=>{
       try {
        if(!localfilepath) return null 
        const uploadResult = await cloudinary.uploader.upload(localfilepath, {
        resource_type: "auto"
    })
    console.log("File uploaded success",uploadResult.url);
    return uploadResult;
       } catch (error) {
        fs.unlinkSync(localfilepath);
       }
}

export {uploadOnCloudinary}