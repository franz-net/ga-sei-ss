import mongoose from "mongoose";
import {add} from 'date-fns';

const ReservationSchema = new mongoose.Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a user']
        },
        court: {
            type: mongoose.Types.ObjectId,
            ref: 'Court',
            required: [true, 'Please provide a court']
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date'],
            validate: {
                validator: function (v) {
                    return (
                        v &&
                        v.getTime() > add(new Date(), {hours: 2}) &&
                        v.getTime() < add(new Date(), {days: 2})
                    )
                },
                message: "The reservation must start 2 hours from now and up to 2 days in advance"
            }
        },
        timezone: {
            type: String,
            required: [true, 'Please provide a valid IANA Time Zone']
        },
        status: {
            type: String,
            enum: ["pending", "confirmed"],
            required: [true, 'Please provide reservation status'],
            default: "pending"
        }
    },
    {timestamps: true}
)

export default mongoose.model('Reservation', ReservationSchema)