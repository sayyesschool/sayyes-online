const { isValidObjectId } = require('mongoose');

const { Ticket } = require('../models');
const Payment = require('./payment');

module.exports = {
    plans: Ticket.plans,

    get(...args) {
        return Ticket.find(...args)
            .populate('user');
    },

    getOne(...args) {
        return Ticket.findOne(...args)
            .populate('user');
    },

    getById(...args) {
        return Ticket.findById(...args)
            .populate('user');
    },

    getSoldByMonth() {
        const today = new Date();

        return Ticket.aggregate()
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
    },

    create(...args) {
        return Ticket.create(...args);
    },

    update(id, ...args) {
        return Ticket.findByIdAndUpdate(id, ...args);
    },

    delete(...args) {
        return Ticket.deleteOne(...args);
    },

    purchase(user, planId, meeting = {}) {
        if (!user) throw new Error('Для приобретения билета необходимо указать пользователя.');

        const plan = Ticket.plans[planId] || {};

        return Payment.make({
            amount: plan.price,
            description: plan.title,
            email: user.email,
            metadata: {
                userId: isValidObjectId(user) ? user : user.id,
                meetingId: isValidObjectId(meeting) ? meeting : meeting.id
            }
        });
    },

    invalidate(user, meeting) {
        return Ticket.findOneAndUpdate(
            { user, meeting },
            { $unset: { meeting: '' } },
            { new: true }
        );
    }
};