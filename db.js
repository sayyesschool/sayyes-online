const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('toObject', {
    virtuals: true,
    getters: true,
    versionKey: false
});

mongoose.set('toJSON', {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform: (document, object, options) => {
        delete object._id;

        if (options.hide) {
            options.hide.split(' ').forEach(prop => delete object[prop]);
        }

        return object;
    }
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

process.on('SIGINT', () => {
    console.info('SIGINT signal received');

    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    connection: mongoose.connection,
    connect: (url, cb) => mongoose.connect(url, {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, cb)
};