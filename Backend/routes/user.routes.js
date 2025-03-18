import express from 'express';
import { body } from 'express-validator';
import {registerUser, loginUser, getUserProfile, logoutUser} from '../controllers/user.controllers.js'
import {authUser} from '../middleware/auth.middleware.js'

const router=express.Router()

router.post('/register',[
    body('fullName.firstName').isLength({min:3}).withMessage("First name should be atleast 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min:6}).withMessage("Password should be atleast 6 characters long"),
],registerUser)

router.post('/login',[
    body("email").isEmail().withMessage("Please enter a valid email"),body("password").isLength({min: 6}).withMessage("Password should be atleast 6 characters long")
],loginUser)

router.get('/profile',authUser,getUserProfile)
router.get("/logout", authUser,logoutUser)

export default router