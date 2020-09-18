const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const roles = {
    admin: 'Администратор',
    client: 'Клиент',
    manager: 'Менеджер',
    student: 'Студент',
    teacher: 'Преподаватель'
};

const User = new Schema({
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
        minlength: [2, 'Фамилия слишком короткая.'],
        maxlength: [64, 'Фамилия слишком длинная.'],
        match: [/^[^0-9 ]+$/, 'В фамилии не должно быть пробелов и цифр.']
    },
    patronym: {
        type: String,
        trim: true,
        minlength: [2, 'Отчество слишком короткая.'],
        maxlength: [64, 'Отчество слишком длинная.'],
        match: [/^[^0-9 ]+$/, 'В отчестве не должно быть пробелов и цифр.']
    },
    email: {
        type: String,
        required: [true, 'Поле Email обязательно для заполнения.'],
        unique: true,
        trim: true,
        minlength: [7, 'Адрес электронный почты слишком короткий.'],
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    phone: { type: String, trim: true },
    password: { type: String, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['man', 'woman'] },
    timezone: { type: String },
    avatar: { type: String, trim: true },
    role: { type: String, enum: Object.keys(roles), default: 'client' },
    blocked: { type: Boolean, default: false, alias: 'isBlocked' },
    activated: { type: Boolean, default: false, alias: 'isActivated' },
    activationToken: String,
    activationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    note: { type: String, trim: true }
}, {
    timestamps: true,
    discriminatorKey: 'role'
});

/* Virtuals */

User.virtual('fullname').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

User.virtual('initials').get(function() {
    return `${this.firstname[0]}${this.lastname[0]}`;
});

User.virtual('roleLabel').get(function() {
    return roles[this.role];
});

User.virtual('url').get(function() {
    return `/${this.role}s/${this.id}`;
});


/* Statics */

User.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

User.statics.generateToken = function() {
    return crypto.randomBytes(20).toString('hex');
};

/* Methods */

User.methods.validatePassword = function(password) {
    if (!this.password) throw new Error('Необходимо сбросить пароль.');

    return bcrypt.compareSync(password, this.password);
};

User.methods.generateActivationToken = function() {
    this.activationToken = User.statics.generateToken();
    this.activationTokenExpiresAt = Date.now() + 86400000;

    return this.save();
};

User.methods.generateResetPasswordToken = function() {
    this.resetPasswordToken = User.statics.generateToken();
    this.resetPasswordTokenExpiresAt = Date.now() + 86400000;

    return this.save();
};

User.methods.isActivationTokenValid = function(token) {
    return (this.activationToken === token) && (new Date() <= this.activationTokenExpiresAt);
};

User.methods.isResetPasswordTokenValid = function(token) {
    return (this.resetPasswordToken === token) && (new Date() <= this.resetPasswordTokenExpiresAt);
};

/* Middleware */

// Generate password
User.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());

    next();
});

// Check email
User.pre('save', function(next) {
    if (!this.isModified('email')) return next();

    mongoose.models.User.findOne({ email: this.email })
        .then(user => {
            if (user) next(new Error('Пользователь с таким адресом электронной почты уже зарегистрирован'));
            else next();
        });
});

// Add required fields
User.pre('save', function(next) {
    if (!this.isNew) return next();

    // Generate email verification token
    this.activationToken = User.statics.generateToken();
    this.activationTokenExpiresAt = Date.now() + 86400000;

    next();
});

// Catch errors
User.post('save', function(error, user, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Имя пользователя или адрес электронной почты заняты.'));
    } else {
        next(error);
    }
});

module.exports = User;