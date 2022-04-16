import express from "express";
import {login, register, update} from "../controllers/authController";
import authVerification from "../middleware/authVerification";

const authRouter = express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/update').patch(authVerification, update)

export default authRouter