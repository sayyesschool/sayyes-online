import { randomBytes } from 'node:crypto';

import bcryptjs from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

import Image from '../image';

import Person from './Person';

export const UserRole = {
    Admin: 'admin',
    Editor: 'editor',
    Learner: 'learner',
    Manager: 'manager',
    Member: 'member',
    Teacher: 'teacher'
};

function hashPassword(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync());
}

function generateToken() {
    return randomBytes(20).toString('hex');
}

export const User = new Schema([Person, {
    password: {
        type: String,
        trim: true,
        set: hashPassword
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Customer
    },
    image: { type: Image },
    accounts: {
        type: Map,
        of: String,
        default: {}
    },
    timezone: { type: String },
    blocked: { type: Boolean, default: false, alias: 'isBlocked' },
    activated: { type: Boolean, default: false, alias: 'isActivated' },
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

/* Statics */

User.statics.Role = UserRole;
User.statics.hashPassword = hashPassword;
User.statics.generateToken = generateToken;

/* Virtuals */

User.virtual('url').get(function() {
    return `/${this.role}s/${this.id}`;
});

/* Methods */

User.methods.validatePassword = function(password) {
    if (!this.password) throw new Error('Необходимо сбросить пароль.');

    return bcryptjs.compareSync(password, this.password);
};

User.methods.resetPassword = function(password) {
    this.password = password;
    this.resetPasswordToken = undefined;
    this.resetPasswordTokenExpiresAt = undefined;

    return this.save();
};

User.methods.generateActivationToken = function() {
    this.activationToken = generateToken();
    this.activationTokenExpiresAt = Date.now() + 86400000;

    return this.save();
};

User.methods.generateResetPasswordToken = function() {
    this.resetPasswordToken = generateToken();
    this.resetPasswordTokenExpiresAt = Date.now() + 86400000;

    return this.save();
};

User.methods.isActivationTokenValid = function(token) {
    return (this.activationToken === token) && (new Date() <= this.activationTokenExpiresAt);
};

User.methods.isResetPasswordTokenValid = function(token) {
    return (this.resetPasswordToken === token) && (new Date() <= this.resetPasswordTokenExpiresAt);
};

User.methods.addAccount = function(account) {
    this.accounts.push(account);

    return this.save();
};

User.methods.removeAccount = function(accountId) {
    const account = this.accounts.id(accountId);

    if (!account) {
        const error = new Error('Аккаунт не найден');
        error.status = 404;
        throw error;
    }

    account.remove();

    return this.save().then(() => account);
};

User.methods.toData = function() {
    return {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        fullname: this.fullname,
        email: this.email,
        dob: this.dob,
        image: this.image,
        initials: this.initials,
        balance: this.balance,
        role: this.role,
        timezone: this.timezone,
        accounts: this.accounts,
        permissions: this.permissions
    };
};

/* Middleware */

// Generate password
// User.pre('save', function(next) {
//     if (!this.isModified('password')) return next();

//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());

//     next();
// });

// Check email
User.pre('save', function(next) {
    if (!this.isModified('email') || this.email === '') return next();

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
    this.activationToken = generateToken();
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

export default User;