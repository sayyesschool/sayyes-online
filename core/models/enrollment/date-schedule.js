const mongoose = require('mongoose');

const { Schema } = mongoose;

const DateSchedule = new Schema({
    date: String,
    from: String,
    to: String
});

DateSchedule.virtual('label').get(function() {
    let result = this.date;

    if (this.from) result += `@${this.from}`;
    if (this.to) result += `-${this.to}`;

    return result;
});

module.exports = DateSchedule;