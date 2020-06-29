const { Teacher } = require('../models');

module.exports = {
    get(...args) {
        return Teacher.find(...args);
    },

    getOne(...args) {
        return Teacher.findOne(...args);
    },

    getById(...args) {
        return Teacher.findById(...args);
    },

    create(...args) {
        return Teacher.create(...args);
    },

    update(id, data, options) {
        return Teacher.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Teacher.findByIdAndDelete(id, ...args);
    }
};