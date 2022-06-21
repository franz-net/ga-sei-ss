import {BadRequestError, NotFoundError} from "../errors";
import StatusCodes from "http-status-codes";
import {Op} from "sequelize";
import moment from "moment-timezone";

const Reservation = require('../models').Reservation
const Court = require('../models').Court

const createReservation = async (req, res) => {

    const {courtId, duration, date} = req.body

    if (!courtId || !date || !duration) {
        throw new BadRequestError("Please provide all reservation details")
    }
    req.body.endDate = moment(date).add(duration, 'hours')

    

    const courtAlreadyReserved = await Reservation.findOne(
        {
            where: {
                [Op.and]: {
                    date: {
                        [Op.lte]: moment.utc(req.body.endDate).tz(req.body.timezone)
                    },
                    endDate: {
                        [Op.gte]: moment.utc(date).tz(req.body.timezone)
                    },
                    courtId: {
                        [Op.eq]: courtId
                    }
                }
            }
        }
    )
    if (courtAlreadyReserved) {
        throw new BadRequestError(`Error, this time is already reserved.`)
    }

    req.body.reservedBy = req.user.userId
    req.body.date = date
    const reservation = await Reservation.create(req.body)
    res.status(StatusCodes.CREATED).json({reservation})
    
}

const updateReservation = async (req, res) => {
    const {id: reservationId} = req.params
    const {courtId, timezone, date} = req.body

    console.log(date, courtId, timezone)

    if (!courtId || !date || !timezone) {
        throw new BadRequestError("Please provide all reservation details")
    }

    const reservation = await Reservation.findOne({_id: reservationId})

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }


    const courtAlreadyReserved = await Reservation.findOne(
        {
            where: {
                [Op.and]: {
                    date: {
                        [Op.lte]: moment.utc(req.body.endDate).tz(req.body.timezone)
                    },
                    endDate: {
                        [Op.gte]: moment.utc(date).tz(req.body.timezone)
                    },
                    courtId: {
                        [Op.eq]: courtId
                    }
                }
            }
        }
    )
    if (courtAlreadyReserved) {
        throw new BadRequestError(`Error, this time is already reserved.`)
    }

    req.body.user = req.user.userId
    req.body.date = date

    const updatedReservation = await Reservation.findOneAndUpdate({_id: reservationId}, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({updatedReservation})
}

const getReservations = async (req, res) => {
    // If admin get All
    const reservations = await Reservation.findAll({
        where: {
            reservedBy: {
                [Op.eq]: req.user.userId
            },
            courtId: {
                [Op.not]: null
            }
        }, include: [{
            model: Court
        }]
    })
    res.status(StatusCodes.OK).json({reservations, totalReservations: reservations.length, numOfPages: 1})

}

const deleteReservation = async (req, res) => {
    const {id: reservationId} = req.params

    const reservation = await Reservation.findOne({
        where: {
            id: {
                [Op.eq]: reservationId
            }
        }
    })

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }
    // Only edit if admin
    //checkPermissions(req.user, reservation.user)
    await reservation.destroy()


    res.status(StatusCodes.OK).json({msg: 'Success! Reservation has been removed'})
}

export {createReservation, updateReservation, deleteReservation, getReservations}