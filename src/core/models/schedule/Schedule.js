import { Schema } from 'mongoose';

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const Schedule = new Schema({
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

export default Schedule;