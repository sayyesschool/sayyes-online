const mongoose = require('mongoose');

const { Schema } = mongoose;

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Schedule = new Schema({
    days: { type: [Number], enum: [0, 1, 2, 3, 4, 5, 6], required: true },
    from: { type: Number, min: 0, max: 23 },
    to: { type: Number, min: 0, max: 23 }
});

Schedule.virtual('label').get(function() {
    const days = this.days.map(n => labels[n]).join('/');

    return `${days} c ${this.from} до ${this.to}`;
});

module.exports = Schedule;