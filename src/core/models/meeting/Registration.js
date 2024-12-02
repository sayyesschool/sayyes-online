import { Schema } from 'mongoose';

import { RegistrationStatus } from './constants';

export const Registration = new Schema({
    registrant: {
        email: { type: String, required: true, trim: true, lowercase: true },
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true }
    },
    userId: { type: Schema.Types.ObjectId },
    ticketId: { type: Schema.Types.ObjectId },
    zoomId: { type: String },
    status: {
        type: String,
        enum: Object.values(RegistrationStatus),
        default: RegistrationStatus.Pending
    },
    participated: { type: Boolean, default: false },
    joinUrl: { type: String }
});

Registration.virtual('meetingId').get(function() {
    return this.parent()._id;
});

Registration.virtual('isPending').get(function() {
    return this.status === RegistrationStatus.Pending;
});

Registration.virtual('isApproved').get(function() {
    return this.status === RegistrationStatus.Approved;
});

Registration.virtual('isConfirmed').get(function() {
    return this.status === RegistrationStatus.Confirmed;
});

Registration.virtual('isCanceled').get(function() {
    return this.status === RegistrationStatus.Canceled;
});

Registration.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

export default Registration;