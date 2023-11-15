const { Schema, model } = require('mongoose');
const moment = require('moment');

const plans = {
    single: {
        id: 'single',
        title: 'Единоразовое посещение',
        price: 300,
        features: [
            'Тест-драйв формата',
            'Выгодно при редких посещениях'
        ]
    },

    month: {
        id: 'month',
        title: 'Билет на 1 месяц',
        price: 1400,
        duration: [1, 'months'],
        features: [
            'Регулярные занятия',
            'Безлимитное посещение'
        ]
    },

    quarter: {
        id: 'quarter',
        title: 'Билет на 3 месяца',
        price: 3780,
        duration: [3, 'months'],
        features: [
            'Максимальное погружение',
            'Безлимитное посещение',
            'Скидка 10%'
        ]
    }
};

const Ticket = new Schema({
    type: { type: String, enum: ['single', 'month', 'quarter'], default: 'single', alias: 'plan' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    meeting: { type: Schema.Types.ObjectId, ref: 'Meeting' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' }
}, {
    timestamps: true
});

Ticket.statics.plans = plans;

Ticket.virtual('title').get(function() {
    return plans[this.plan].title;
});

Ticket.virtual('price').get(function() {
    return this.payment?.amount;
});

Ticket.virtual('paidAt').get(function() {
    return this.payment?.datetime;
});

Ticket.virtual('expiresAt').get(function() {
    if (this.plan === 'single') return;

    const plan = plans[this.plan];

    return moment(this.paidAt).add(...plan.duration).toDate();
});

Ticket.virtual('isActive').get(function() {
    if (this.plan === 'single') {
        return !this.meeting;
    } else {
        return moment().isSameOrBefore(this.expiresAt);
    }
});

Ticket.virtual('isExpired').get(function() {
    if (this.plan === 'single') return;

    return moment().isSameOrBefore(this.expiresAt);
});

module.exports = model('Ticket', Ticket);