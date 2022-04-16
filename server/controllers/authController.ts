import {BadRequestError} from "../errors/index"
import User from "../models/User";
import {StatusCodes} from "http-status-codes";

const register = async (req, res, next) => {
    
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please fill in all details!')
    }

    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
        throw new BadRequestError('Error, signing up, please try again!')
    }

    const user = await User.create({name, email, password})
    const jwtToken = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            role: user.role
        }, jwtToken
    })
}

export {register}