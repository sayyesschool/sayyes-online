import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

const Membership = new Schema({
    limit: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    registrationIds: [{ type: Schema.Types.ObjectId, ref: 'Registration' }]
}, {
    timestamps: true
});

Membership.query.unexpired = function() {
    return this.where({
        $or: [
            { endDate: { $exists: false } },
            { endDate: { $gt: new Date() } }
        ]
    });
};

Membership.statics.getSoldByMonth = async function() {
    const today = new Date();

    return this.aggregate()
        .match({
            paidAt: {
                $gt: new Date(today.getFullYear() - 1, 11, 31),
                $lt: new Date(today.getFullYear() + 1, 0)
            }
        })
        .group({
            _id: { $month: '$paidAt' },
            count: { $sum: 1 },
            amount: { $sum: '$price' }
        });
};

Membership.statics.getEndDate = function(startDate, pack) {
    if (!pack.duration) return;

    return datetime(startDate).add(...pack.duration).toDate();
};

Membership.virtual('registrationsCount').get(function() {
    return this.registrationIds.length;
});

Membership.virtual('isActive').get(function() {
    return !this.isExpired && this.isValid;
});

Membership.virtual('isExpired').get(function() {
    return this.endDate && datetime().add(1, 'day').isAfter(this.endDate);
});

Membership.virtual('isValid').get(function() {
    return this.registrationsCount < this.limit;
});

Membership.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

Membership.virtual('registrations', {
    ref: 'Registration',
    localField: 'registrationIds',
    foreignField: '_id'
});

export default Membership;