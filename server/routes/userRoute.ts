import express from "express";
import {register, update} from "../controllers/userController";
import authVerification from "../middleware/authVerification";

const userRouter = express.Router()

userRouter.route('/').post(register)
userRouter.route('/').patch(authVerification, update)

export default userRouter