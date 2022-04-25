import express from "express";
import {getAllUsers, register, update} from "../controllers/userController";
import authVerification from "../middleware/authVerification";

const userRouter = express.Router()

userRouter.route('/').post(register)
userRouter.route('/').patch(authVerification, update)
userRouter.route('/').get(authVerification, getAllUsers)

export default userRouter