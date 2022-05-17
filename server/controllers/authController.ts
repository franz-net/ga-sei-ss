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

    const last_ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const last_login_at = new Date()

    await user.update({last_ip_address: last_ip_address, last_login_at: last_login_at})

    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token})
}

export {login}