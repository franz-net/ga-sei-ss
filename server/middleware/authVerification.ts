import jwt from 'jsonwebtoken';
import {UnauthenticatedError} from "../errors";

const authVerification = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Invalid Authentication')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid Authentication')
    }
}

export default authVerification