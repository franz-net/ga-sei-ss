import {BadRequestError} from "../errors/index"
import User from "../models/User";
import {StatusCodes} from "http-status-codes";
import {UnauthenticatedError} from "../errors";

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token})
}

export {login}