import moment from 'moment';
import { Schema } from 'mongoose';

export const Gender = {
    Female: 'female',
    Male: 'male',
    Unknown: ''
};

export const Person = new Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: [2, 'Имя слишком короткое.'],
        maxlength: [64, 'Имя слишком длинное.'],
        match: [/^[^0-9 ]+$/, 'В имени не должно быть пробелов и цифр.'],
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: [64, 'Фамилия слишком длинная.'],
        match: [/^[^0-9 ]+$/, 'В фамилии не должно быть пробелов и цифр.'],
        default: '―'
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
        maxlength: 12,
        set: value => value.trim().replace(/[\s()\-+]+/g, '')
    },
    phones: [{
        type: String,
        trim: true,
        maxlength: 12,
        set: value => value.trim().replace(/[\s()\-+]+/g, '')
    }],
    gender: {
        type: String,
        enum: Object.values(Gender),
        default: Gender.Unknown
    },
    dob: { type: Date }
});

Person.virtual('fullname').get(function() {
    return [
        this.firstname,
        this.lastname
    ].filter(Boolean).join(' ');
});

Person.virtual('initials').get(function() {
    return [
        this.firstname?.at(0),
        this.lastname?.at(0)
    ].filter(Boolean).join('');
});

Person.virtual('birthdate').get(function() {
    return this.dob && moment(this.dob).format('DD.MM.YYYY');
});

Person.virtual('age').get(function() {
    return this.dob && moment().diff(this.dob, 'years');
});

export default Person;