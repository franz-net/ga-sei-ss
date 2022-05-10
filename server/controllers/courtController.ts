import {BadRequestError, NotFoundError} from "../errors";
import StatusCodes from "http-status-codes";
import checkPermissions from "../utils/checkPermissions";

const Court = require('../models').Court

const createCourt = async (req, res) => {

    const {courtName, courtType, inService} = req.body

    if (!courtName || !courtType || inService == null) {
        throw new BadRequestError("Please provide all court details")
    }

    const courtAlreadyExists = await Court.findOne({courtName})
    if (courtAlreadyExists) {
        throw new BadRequestError(`Error, ${courtName} already exists.`)
    }


    req.body.createdBy = req.user.userId
    const court = await Court.create(req.body)
    res.status(StatusCodes.CREATED).json({court})
}

const getAllCourts = async (req, res) => {
    const courts = await Court.findAll()
    console.log(courts)
    res.status(StatusCodes.OK).json({courts, totalCourts: courts.length, numOfPages: 1})

    // if frontEnd checking for reservations, need to exclude the ones that are not inService
}

const updateCourt = async (req, res) => {
    const {id: courtId} = req.params
    const {courtName, courtType, inService} = req.body

    if (!courtName || !courtType || inService == null) {
        console.log(courtName)
        throw new BadRequestError('Please provide all values')
    }

    const court = await Court.findOne({_id: courtId})

    if (!court) {
        throw new NotFoundError(`No court with id: ${courtId}`)
    }
    // Only edit if admin
    checkPermissions(req.user, court.createdBy)

    const updatedCourt = await Court.findOneAndUpdate({_id: courtId}, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({updatedCourt})
}

const deleteCourt = async (req, res) => {
    const {id: courtId} = req.params

    const court = await Court.findOne({_id: courtId})

    if (!court) {
        throw new NotFoundError(`No court with id: ${courtId}`)
    }
    checkPermissions(req.user, court.createdBy)
    await court.remove()

    res.status(StatusCodes.OK).json({msg: 'Success! Court has been removed'})
}

export {createCourt, updateCourt, deleteCourt, getAllCourts}