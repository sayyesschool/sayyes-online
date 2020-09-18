module.exports = Manager => ({
    get(...args) {
        return Manager.find(...args);
    },

    getOne(...args) {
        return Manager.findOne(...args);
    },

    getById(...args) {
        return Manager.findById(...args);
    },

    create(...args) {
        return Manager.create(...args);
    },

    update(id, data, options) {
        return Manager.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Manager.findByIdAndDelete(id, ...args);
    }
});