const { Schema } = require('mongoose');

const Pack = new Schema({
    age: { type: String, required: true },
    domain: { type: String, required: true },
    teacherType: { type: String },
    numberOfLessons: { type: Number, required: true },
    pricePerLesson: { type: Number, required: true },
    lessonDuration: { type: Number, required: true }
}, {
    timestamps: false
});

Pack.virtual('price').get(function() {
    return Math.ceil((this.numberOfLessons * this.pricePerLesson) / 100) * 100;
});

module.exports = Pack;