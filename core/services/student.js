module.exports = Student => ({
    get(...args) {
        return Student.find(...args);
    },

    getOne(...args) {
        return Student.findOne(...args);
    },

    getById(...args) {
        return Student.findById(...args);
    },

    create(...args) {
        return Student.create(...args);
    },

    update(id, data, options) {
        return Student.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Student.findByIdAndDelete(id, ...args);
    }
});