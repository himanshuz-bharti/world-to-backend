import dotenv from "dotenv"
import connectDB from "./db/index.js";

import app from "./app.js"

dotenv.config({
    path:'./env'
})


connectDB().
then(()=>{
    app.on("error",(error)=>{
        console.log("error occuered in app:",error)
        throw error
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app is listening on port:${process.env.PORT}`);
    })
}).
catch((err)=>{
    console.log("Mongo db connection failed:",err)
})



/*
import express from "express"
const app=express();
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODBURI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error occuered in app:",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on Port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error)
        throw error
    }
})()
*/