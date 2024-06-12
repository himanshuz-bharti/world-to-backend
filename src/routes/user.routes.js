import { Router } from "express";
import { registerUser,loginuser,logoutuser } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js"
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registerUser)
router.route("/login").post(loginuser)
router.route("logout").post(verifyJWT,logoutuser)
export default router;