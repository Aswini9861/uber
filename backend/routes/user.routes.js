import express from "express";
const router = express.Router()
import { body } from "express-validator";
import { registerUser,loginUser,getuserProfile, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


router.post("/register",[
    body('email').isEmail().withMessage("invalid email"),
    body('fullname.first_name').isLength({min:3}).withMessage("first name must be 3 character"),
    body('password').isLength({min:6}).withMessage("pssword must be 6 character")
],registerUser)


router.post("/login",[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min:6}).withMessage("pssword must be 6 character")
],loginUser)

router.get('/logout',authMiddleware,logoutUser)

router.get('/profile',authMiddleware,getuserProfile)


export default router
