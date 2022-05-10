import {BadRequestError, NotFoundError} from "../errors";
import StatusCodes from "http-status-codes";
import {dateToUtc} from "../utils/dates";
import checkPermissions from "../utils/checkPermissions";
import {Op} from "sequelize";

const Reservation = require('../models').Reservation

const createReservation = async (req, res) => {

    const {courtId, timezone} = req.body

    if (!courtId || !req.body.date || !timezone) {
        console.log(courtId, timezone, req.body.date)
        console.log('error here!!')
        throw new BadRequestError("Please provide all reservation details")
    }

    const date = dateToUtc(req.body.date, timezone)

    const courtAlreadyReserved = await Reservation.findOne({date, courtId})
    if (courtAlreadyReserved) {
        throw new BadRequestError(`Error, this time is already reserved.`)
    }

    req.body.user = req.user.userId
    req.body.date = date
    const reservation = await Reservation.create(req.body)
    res.status(StatusCodes.CREATED).json({reservation})
}

const updateReservation = async (req, res) => {
    const {id: reservationId} = req.params
    const {courtId, timezone,} = req.body

    console.log(courtId, timezone)

    if (!courtId || !req.body.date || !timezone) {
        throw new BadRequestError("Please provide all reservation details")
    }

    const reservation = await Reservation.findOne({_id: reservationId})

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }

    const date = dateToUtc(req.body.date, timezone)

    const courtAlreadyReserved = await Reservation.findOne({date, courtId})
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
        }
    })
    console.log(reservations)
    res.status(StatusCodes.OK).json({reservations, totalReservations: reservations.length, numOfPages: 1})

}

const deleteReservation = async (req, res) => {
    const {id: reservationId} = req.params

    const reservation = await Reservation.findOne({_id: reservationId})

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }
    // Only edit if admin
    checkPermissions(req.user, reservation.user)
    await reservation.remove()

    res.status(StatusCodes.OK).json({msg: 'Success! Reservation has been removed'})
}

export {createReservation, updateReservation, deleteReservation, getReservations}