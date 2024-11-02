import { Schema } from 'mongoose';

const Status = {
    Pending: 'pending',
    Approved: 'approved',
    Canceled: 'canceled',
    Denied: 'denied'
};

export const Registration = new Schema({
    userId: { type: Schema.Types.ObjectId },
    registrant: {
        email: { type: String, required: true, trim: true, lowercase: true },
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true }
    },
    zoomId: { type: String },
    status: { type: String, enum: Object.values(Status), default: Status.Pending },
    joinUrl: { type: String },
    participated: { type: Boolean, default: false }
});

Registration.virtual('isApproved').get(function() {
    return this.status === Status.Approved;
});

Registration.virtual('isCanceled').get(function() {
    return this.status === Status.Canceled;
});

export default Registration;