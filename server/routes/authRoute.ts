import express from "express";
import {register} from "../controllers/authController";

const authRouter = express.Router()

authRouter.route('/register').post(register)


export default authRouter