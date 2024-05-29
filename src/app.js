import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:process.env.CORS,
    credentials:true
}))
app.use(express.json({limit:"18kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"17kb"
 }))
 app.use(express.static("public"))
 app.use(cookieParser())

 //import routes

 import routes from "./routes/user.routes.js"

 app.use("/api/v1/users",routes);
export default app;