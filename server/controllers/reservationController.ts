import {BadRequestError, NotFoundError} from "../errors";
import StatusCodes from "http-status-codes";
import Reservation from "../models/Reservation";
import {dateToUtc} from "../utils/dates";

const createReservation = async (req, res) => {

    const {court, timezone} = req.body

    if (!court || !req.body.date || !timezone) {
        throw new BadRequestError("Please provide all reservation details")
    }

    const date = dateToUtc(req.body.date, timezone)

    const courtAlreadyReserved = await Reservation.findOne({date, court})
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
    const {court, timezone,} = req.body

    if (!court || !req.body.date || !timezone) {
        throw new BadRequestError("Please provide all reservation details")
    }

    const reservation = await Reservation.findOne({_id: reservationId})

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }

    const date = dateToUtc(req.body.date, timezone)

    const courtAlreadyReserved = await Reservation.findOne({date, court})
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
    const reservations = await Reservation.find({user: req.user.userId, court: {$ne: null}})
        .populate({path: 'user', select: 'email'})
        .populate({path: 'court', select: ['courtName', 'courtType']})

    console.log(reservations)

    res.status(StatusCodes.OK).json({reservations, totalReservations: reservations.length, numOfPages: 1})

}

const deleteReservation = async (req, res) => {
    const {id: reservationId} = req.params

    const reservation = await Reservation.findOne({_id: reservationId})

    if (!reservation) {
        throw new NotFoundError(`No court with id: ${reservationId}`)
    }
    await reservation.remove()

    res.status(StatusCodes.OK).json({msg: 'Success! Reservation has been removed'})
}

export {createReservation, updateReservation, deleteReservation, getReservations}