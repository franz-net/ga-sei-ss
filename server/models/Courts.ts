import mongoose from "mongoose";

const CourtsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please provide the court name'],
            minlength: 2,
            maxlength: 20,
            trim: true
        },
        type: {
            type: String,
            required: [true, 'Please provide the court type'],
            minlength: 5,
            maxlength: 6,
            trim: true
        },
        inService: {
            type: Boolean,
            required: [true, 'Please confirm if the court is in service'],
            default: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    }, {timestamps: true}
)

export default mongoose.model('Courts', CourtsSchema)