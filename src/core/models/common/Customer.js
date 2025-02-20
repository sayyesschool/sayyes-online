import { Schema } from 'mongoose';

export const Customer = new Schema({
    name: { type: String },
    email: {
        type: String,
        trim: true,
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    phone: {
        type: String,
        set: (value = '') => value.trim().replace(/[\s()\-+]+/g, '')
    }
}, {
    _id: false,
    id: false,
    strict: false,
    timestamps: false
});

export default Customer;