import { isObjectIdOrHexString, Schema } from 'mongoose';

import { RegistrationStatus } from './constants';

export const Registration = new Schema({
    status: {
        type: String,
        enum: Object.values(RegistrationStatus),
        default: RegistrationStatus.Pending
    },
    joinUrl: { type: String },
    zoomId: { type: String },
    userId: { type: Schema.Types.ObjectId },
    meetingId: { type: Schema.Types.ObjectId },
    membershipId: { type: Schema.Types.ObjectId }
});

Registration.statics.findByUser = function($user) {
    const userId = isObjectIdOrHexString($user) ? $user : $user?.id;

    return this.find({ userId });
};

Registration.statics.findOneByUser = function($user) {
    const userId = isObjectIdOrHexString($user) ? $user : $user?.id;

    return this.findOne({ userId });
};

Registration.virtual('isPending').get(function() {
    return this.status === RegistrationStatus.Pending;
});

Registration.virtual('isApproved').get(function() {
    return this.status === RegistrationStatus.Approved;
});

Registration.virtual('isDenied').get(function() {
    return this.status === RegistrationStatus.Denied;
});

Registration.virtual('isCanceled').get(function() {
    return this.status === RegistrationStatus.Canceled;
});

Registration.virtual('isAttended').get(function() {
    return this.status === RegistrationStatus.Attended;
});

Registration.virtual('isMissed').get(function() {
    return this.status === RegistrationStatus.Missed;
});

Registration.virtual('isResolved').get(function() {
    return this.isAttended || this.isMissed;
});

Registration.virtual('isFree').get(function() {
    return !this.membershipId;
});

Registration.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

export default Registration;