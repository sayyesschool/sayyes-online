const { Schema } = require('mongoose');

const Person = new Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: [2, 'Имя слишком короткое.'],
        maxlength: [64, 'Имя слишком длинное.'],
        match: [/^[^0-9 ]+$/, 'В имени не должно быть пробелов и цифр.']
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: [64, 'Фамилия слишком длинная.'],
        match: [/^[^0-9 ]+$/, 'В фамилии не должно быть пробелов и цифр.']
    },
    patronym: {
        type: String,
        trim: true,
        maxlength: [64, 'Отчество слишком длинное.'],
        match: [/^[^0-9 ]+$/, 'В отчестве не должно быть пробелов и цифр.']
    },
    email: {
        type: String,
        trim: true,
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    phone: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 12,
        set: value => value.trim().replace(/[\s()\-\+]+/g, '')
    },
    gender: { type: String, enum: ['male', 'female'] },
    dob: { type: Date }
});

module.exports = Person;