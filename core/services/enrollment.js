module.exports = Enrollment => ({
    get(...args) {
        return Enrollment.find(...args);
    },

    getOne(...args) {
        return Enrollment.findOne(...args);
    },

    getById(...args) {
        return Enrollment.findById(...args);
    },

    create(...args) {
        return Enrollment.create(...args);
    },

    update(id, data, options) {
        return Enrollment.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Enrollment.findByIdAndDelete(id, ...args);
    }
});