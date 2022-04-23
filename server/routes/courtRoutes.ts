import express from 'express';
import {createCourt, deleteCourt, updateCourt} from '../controllers/courtController'

const courtRouter = express.Router()

courtRouter.route('/').post(createCourt);
courtRouter.route('/:id').patch(updateCourt).delete(deleteCourt);

export default courtRouter