import {BadRequestError} from "../errors/index"
import {StatusCodes} from "http-status-codes";

const User = require('../models').User

const register = async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please fill in all details!')
    }
    const userAlreadyExists = await User.findOne({where: {email}})
    if (userAlreadyExists) {
        throw new BadRequestError('Error, signing up, please try again!')
    }
    const last_ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const last_login_at = new Date()
    const user = await User.create({name, email, password, last_ip_address, last_login_at})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user, token})
}

const getAllUsers = async (req, res) => {
    const userList = await User.findAll({attributes: {exclude: ['password']}})
    res.status(StatusCodes.OK).json({userList, totalUsers: userList.length, numOfPages: 1})
}

const update = async (req, res) => {
    const {email, name, lastName, password} = req.body
    if (!email || !name || !lastName) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({_id: req.user.userId})
    user.email = email
    user.name = name
    user.lastName = lastName
    if (password) {
        user.password = password
    }

    await user.save()
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token})
}

export {register, update, getAllUsers}