import express from 'express';
import {createCourt, deleteCourt, getAllCourts, updateCourt} from '../controllers/courtController'

const courtRouter = express.Router()

courtRouter.route('/').post(createCourt).get(getAllCourts);
courtRouter.route('/:id').patch(updateCourt).delete(deleteCourt);

export default courtRouter