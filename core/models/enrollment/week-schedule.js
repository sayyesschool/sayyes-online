const mongoose = require('mongoose');

const { Schema } = mongoose;

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const WeekSchedule = new Schema({
    day: { type: Number, min: 0, max: 6 },
    from: { type: String },
    to: { type: String }
});

WeekSchedule.virtual('label').get(function() {
    let result = labels[this.day];

    if (this.from) result += ` ${this.from}`;
    if (this.to) result += `-${this.to}`;

    return result;
});

module.exports = WeekSchedule;