import { Schema } from 'mongoose';

export const Registration = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    registrant: {
        email: { type: String, required: true, trim: true, lowercase: true },
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true }
    },
    zoomId: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'canceled', 'denied'], default: 'pending' },
    joinUrl: { type: String }
});

export default Registration;