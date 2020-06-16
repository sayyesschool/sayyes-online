const { User } = require('../models');

module.exports = {
    roles: User.roles,

    get(...args) {
        return User.find(...args);
    },

    getOne(...args) {
        return User.findOne(...args);
    },

    getById(...args) {
        return User.findById(...args);
    },

    create(...args) {
        return User.create(...args);
    },

    update(id, data, options) {
        return User.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return User.findByIdAndDelete(id, ...args);
    }
};