import express from "express";
import {login} from "../controllers/authController";

const authRouter = express.Router()

authRouter.route('/login').post(login)

export default authRouter