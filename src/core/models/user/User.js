import { randomBytes } from 'node:crypto';

import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

import Image from '../image';

import { UserDomain, UserPermissions, UserRole } from './constants';
import Person from './Person';

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
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
    image: { type: Image },
    accounts: {
        type: Map,
        of: String,
        default: {}
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Learner
    },
    active: { type: Boolean, default: false, alias: 'isActive' },
    blocked: { type: Boolean, default: false, alias: 'isBlocked' },
    domains: {
        type: [String],
        enum: Object.values(UserDomain),
        default: [UserDomain.LK]
    },
    permissions: {
        type: [String],
        enum: UserPermissions,
        default: []
    },
    timezone: { type: String },
    note: { type: String, trim: true },
    data: { type: Object, default: {} },
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
    return this.id ? `/${this.role ?? 'user'}s/${this.id}` : undefined;
});

User.virtual('isAdmin').get(function() {
    return this.role && this.role === UserRole.Admin;
});

User.virtual('isLearner').get(function() {
    return this.role && this.role === UserRole.Learner;
});

User.virtual('isManager').get(function() {
    return this.role && this.role === UserRole.Manager;
});

User.virtual('isMember').get(function() {
    return this.domains?.includes('club');
});

User.virtual('isTeacher').get(function() {
    return this.role && this.role === UserRole.Teacher;
});

/* Methods */

User.methods.validatePassword = function(password) {
    if (!this.password) throw new Error('Необходимо сбросить пароль.');

    return bcrypt.compareSync(password, this.password);
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

User.methods.is = function(arg) {
    const roles = Array.isArray(arg) ? arg : [...arguments];

    return roles.includes(this.role);
};

User.methods.can = function(permission) {
    return this.permissions.includes(permission);
};

User.methods.hasDomain = function(domain) {
    return this.domains.includes(domain);
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
        timezone: this.timezone,
        accounts: this.accounts,
        role: this.role,
        permissions: this.permissions,
        isLearner: this.isLearner,
        isTeacher: this.isTeacher,
        isMember: this.isMember
    };
};

/* Middleware */

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