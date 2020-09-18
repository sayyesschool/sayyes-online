module.exports = Client => ({
    get(...args) {
        return Client.find(...args);
    },

    getOne(...args) {
        return Client.findOne(...args);
    },

    getById(...args) {
        return Client.findById(...args);
    },

    create(...args) {
        return Client.create(...args);
    },

    update(id, data, options) {
        return Client.findByIdAndUpdate(id, data, { new: true, ...options });
    },

    delete(id, ...args) {
        return Client.findByIdAndDelete(id, ...args);
    }
});