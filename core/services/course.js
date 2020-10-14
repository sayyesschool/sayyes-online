module.exports = Course => ({
    model: Course,
    schema: Course.schema,

    get(...args) {
        return Course.find(...args);
    },

    getOne(...args) {
        return Course.findOne(...args);
    },

    getById(...args) {
        return Course.findById(...args);
    },

    create(...args) {
        return Course.create(...args);
    },

    update(arg, ...args) {
        return typeof arg === 'string' ?
            Course.findByIdAndUpdate(arg, ...args)
            :
            Course.findOneAndUpdate(arg, ...args);
    },

    delete(arg, ...args) {
        return typeof arg === 'string' ?
            Course.findByIdAndDelete(arg, ...args)
            :
            Course.findOneAndDelete(arg, ...args);
    }
});