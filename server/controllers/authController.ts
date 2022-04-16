import {BadRequestError} from "../errors/index"
import User from "../models/User";
import {StatusCodes} from "http-status-codes";
import {UnauthenticatedError} from "../errors";

const register = async (req, res) => {

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

export {register, login}