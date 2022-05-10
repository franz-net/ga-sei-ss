import {BadRequestError} from "../errors/index"
import {StatusCodes} from "http-status-codes";
import {UnauthenticatedError} from "../errors";
import {Op} from "sequelize";

const User = require('../models').User

const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        },
    })
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