const { Schema } = require('mongoose');

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Schedule = new Schema({
    date: { type: String },
    day: { type: Number, min: 0, max: 6 },
    from: { type: String },
    to: { type: String }
});

Schedule.virtual('label').get(function() {
    let result = this.date || labels[this.day];

    if (this.from) result += ` ${this.from}`;
    if (this.to) result += `-${this.to}`;

    return result;
});

module.exports = Schedule;