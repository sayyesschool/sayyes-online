const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Schema, models } = require('mongoose');

const Person = require('./person');

const UserRole = {
    Administrator: 'administrator',
    Customer: 'customer',
    Editor: 'editor',
    Learner: 'learner',
    Manager: 'manager',
    Teacher: 'teacher'
};

const User = new Schema([Person, {
    password: { type: String, trim: true, set: value => bcrypt.hashSync(value, bcrypt.genSaltSync()) },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Customer },
    blocked: { type: Boolean, default: false, alias: 'isBlocked' },
    activated: { type: Boolean, default: false, alias: 'isActivated' },
    timezone: { type: String },
    imageUrl: { type: String },
    socialAccounts: [{
        provider: { type: 'String' },
        value: { type: 'String' }
    }],
    note: { type: String, trim: true },
    activationToken: String,
    activationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date
}], {
    timestamps: true,
    discriminatorKey: 'role',
    toJSON: {
        transform: (doc, obj, options) => {
            delete obj.password;
            return obj;
        }
    }
});

/* Virtuals */

User.virtual('url').get(function() {
    return `/${this.role}s/${this.id}`;
});

User.virtual('balance').get(function() {
    return this.transactions?.reduce((result, transaction) => result + transaction.value, 0);
});

User.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'user'
});

/* Statics */

User.statics.Role = UserRole;

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
    if (!this.isModified('email') || this.email === '') return next();

    models.User.findOne({ email: this.email })
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