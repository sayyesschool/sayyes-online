import moment from 'moment';
import { Schema } from 'mongoose';

const Ticket = new Schema({
    limit: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    purchasedAt: { type: Date },
    expiresAt: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    meetingIds: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
}, {
    timestamps: true
});

Ticket.statics.getSoldByMonth = async function() {
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

Ticket.statics.getExpiration = function(date, pack) {
    if (!pack.duration) return;

    return moment(date).add(...pack.duration).toDate();
};

Ticket.virtual('isExpired').get(function() {
    return this.expiresAt && moment().add(1, 'day').isAfter(this.expiresAt);
});

Ticket.virtual('isValid').get(function() {
    return !this.isExpired && this.meetingIds.length < this.limit;
});

export default Ticket;