const mongoose = require('mongoose');

const { Schema } = mongoose;

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Schedule = new Schema({
    day: { type: Number, min: 0, max: 6 },
    time: { type: Number, min: 0, max: 23 }
}, {
    _id: false,
    id: false
});

// Schedule.virtual('label').get(function() {
//     const days = this.days.map(n => labels[n]).join('/');
//     let label = days;

//     if (this.from) label += ` c ${this.from}`;
//     if (this.to) label += ` до ${this.to}`;

//     return label;
// });

module.exports = Schedule;