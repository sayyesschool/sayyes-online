import moment from 'moment';
import { Schema } from 'mongoose';

const Membership = new Schema({
    limit: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    expiresAt: { type: Date },
    purchasedAt: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    registrationIds: [{ type: Schema.Types.ObjectId, ref: 'Registration' }]
}, {
    timestamps: true
});

Membership.query.unexpired = function() {
    return this.where({
        $or: [
            { expiresAt: { $exists: false } },
            { expiresAt: { $gt: new Date() } }
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

Membership.statics.getExpiration = function(date, pack) {
    if (!pack.duration) return;

    return moment(date).add(...pack.duration).toDate();
};

Membership.virtual('registrationsCount').get(function() {
    return this.registrationIds.length;
});

Membership.virtual('isActive').get(function() {
    return !this.isExpired && this.isValid;
});

Membership.virtual('isExpired').get(function() {
    return this.expiresAt && moment().add(1, 'day').isAfter(this.expiresAt);
});

Membership.virtual('isValid').get(function() {
    return this.registrationsCount < this.limit;
});

Membership.virtual('registrations', {
    ref: 'Registration',
    localField: 'registrationIds',
    foreignField: '_id'
});

export default Membership;