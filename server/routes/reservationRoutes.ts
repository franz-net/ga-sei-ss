import express from 'express';
import {
    createReservation,
    deleteReservation,
    getReservations,
    updateReservation
} from '../controllers/reservationController'

const reservationRouter = express.Router()

reservationRouter.route('/').post(createReservation).get(getReservations);
reservationRouter.route('/:id').patch(updateReservation).delete(deleteReservation);

export default reservationRouter