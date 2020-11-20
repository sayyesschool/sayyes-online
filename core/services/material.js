module.exports = Material => ({
    model: Material,
    schema: Material.schema,

    get(...args) {
        return Material.find(...args);
    },

    getOne(...args) {
        return Material.findOne(...args);
    },

    getById(...args) {
        return Material.findById(...args);
    },

    create(...args) {
        return Material.create(...args);
    },

    update(arg, ...args) {
        return typeof arg === 'string' ?
            Material.findByIdAndUpdate(arg, ...args)
            :
            Material.findOneAndUpdate(arg, ...args);
    },

    delete(arg, ...args) {
        return typeof arg === 'string' ?
            Material.findByIdAndDelete(arg, ...args)
            :
            Material.findOneAndDelete(arg, ...args);
    }
});