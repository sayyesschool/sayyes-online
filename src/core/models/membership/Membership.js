import { Schema } from 'mongoose';

import datetime from 'shared/libs/datetime';

export const Membership = new Schema({
    limit: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    startDate: {
        type: Date,
        required: true,
        set: value => datetime(value).utc().toDate()
    },
    endDate: {
        type: Date,
        required: true,
        set: value => datetime(value).utc().toDate()
    },
    active: { type: Boolean, default: true, alias: 'isActive' },
    userId: { type: Schema.Types.ObjectId, required: true },
    paymentId: { type: Schema.Types.ObjectId },
    registrationIds: [{ type: Schema.Types.ObjectId }]
}, {
    timestamps: true
});

Membership.query.expired = function() {
    const endOfToday = datetime().endOf('day').toDate();

    return this.where({
        endDate: { $lt: endOfToday }
    });
};

Membership.query.expiringIn = function(value, unit) {
    return this.where({
        endDate: {
            $gt: datetime().add(value, unit).startOf(unit).toDate(),
            $lt: datetime().add(value, unit).endOf(unit).toDate()
        }
    });
};

Membership.query.expiringToday = function() {
    return this.expiringIn(0, 'days');
};

Membership.query.withUser = function(options = {}) {
    return this.populate({
        path: 'user',
        select: 'firstname email',
        options: { lean: true },
        ...options
    });
};

Membership.statics.getEndDate = function(startDate, pack) {
    if (!pack.duration) return;

    return datetime(startDate).add(...pack.duration).toDate();
};

Membership.statics.getSoldByMonth = async function() {
    return this.aggregate()
        .match({
            startDate: {
                $gt: datetime().startOf('year').toDate(),
                $lt: datetime().endOf('year').toDate()
            }
        })
        .group({
            _id: { $month: '$startDate' },
            count: { $sum: 1 },
            amount: { $sum: '$price' }
        });
};

Membership.statics.getAlmostFullMemberships = async function({ limitDifference } = { limitDifference: 2 }) {
    const results = await this.aggregate()
        .match({
            limit: { $gte: 4 },
            endDate: { $gt: new Date() }
        })
        .project({
            limit: true,
            registrationIds: true,
            registrationCount: { $size: '$registrationIds' }
        })
        .match({
            $expr: { $eq: ['$registrationCount', { $subtract: ['$limit', limitDifference] }] }
        });

    return this.find({ _id: { $in: results.map(({ _id }) => _id) } }).withUser();
};

Membership.statics.getFullMemberships = async function() {
    const results = await this.aggregate()
        .match({
            endDate: { $gt: new Date() }
        })
        .project({
            limit: true,
            registrationIds: true,
            registrationCount: { $size: '$registrationIds' }
        })
        .match({
            $expr: { $eq: ['$registrationCount', '$limit'] }
        });

    return this.find({ _id: { $in: results.map(({ _id }) => _id) } }).withUser();
};

Membership.virtual('uri').get(function() {
    return `/memberships/${this.id}`;
});

Membership.virtual('registrationsCount').get(function() {
    return this.registrationIds.length;
});

Membership.virtual('isExpiring').get(function() {
    const expiringDate = datetime().add(3, 'days').endOf('day');

    return datetime(this.endDate).isBefore(expiringDate, 'day');
});

Membership.virtual('isExpired').get(function() {
    const endOfToday = datetime().endOf('day');

    return datetime(this.endDate).isBefore(endOfToday, 'day');
});

Membership.virtual('isFull').get(function() {
    return this.registrationsCount === this.limit;
});

Membership.virtual('isValid').get(function() {
    return !this.isExpired && !this.isFull;
});

Membership.virtual('startDateString').get(function() {
    return datetime(this.startDate).format('DD.MM.YYYY');
});

Membership.virtual('endDateString').get(function() {
    return datetime(this.endDate).format('DD.MM.YYYY');
});

Membership.virtual('durationString').get(function() {
    const days = datetime(this.endDate).diff(this.startDate, 'days');

    return datetime.duration(days, 'days').humanize();
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