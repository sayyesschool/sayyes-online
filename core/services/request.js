const { Request } = require('../models');

module.exports = {
    get(...args) {
        return Request.find(...args);
    },

    getOne(...args) {
        return Request.findOne(...args);
    },

    getById(...args) {
        return Request.findById(...args);
    },

    create(...args) {
        return Request.create(...args);
    },

    update(id, data, options) {
        return Request.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Request.findByIdAndDelete(id, ...args);
    }
};