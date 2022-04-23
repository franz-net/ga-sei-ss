import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema({
        courtName: {
            type: String,
            required: [true, 'Please provide the court name'],
            minlength: 2,
            maxlength: 20,
            trim: true,
            unique: true
        },
        courtType: {
            type: String,
            enum: ['tennis', 'padel'],
            required: [true, 'Please provide the court type'],
            default: 'tennis'
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
    },
    {timestamps: true}
)

export default mongoose.model('Court', CourtSchema)