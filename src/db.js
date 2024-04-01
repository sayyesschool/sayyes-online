const mongoose = require('mongoose');

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

        // for (const key in object) {
        //     if (key.startsWith('_')) {
        //         delete object[key];
        //     }
        // }

        if (options.hide) {
            options.hide.split(' ').forEach(prop => delete object[prop]);
        }

        return object;
    }
});

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));
mongoose.connection.on('error', () => console.error(console, 'DB connection error:'));

process.on('SIGINT', async () => {
    console.info('SIGINT signal received');

    await mongoose.connection.close();

    console.log('Disconnected from DB through app termination');
    process.exit(0);
});

module.exports = {
    connection: mongoose.connection,
    connect: uri => mongoose.connect(uri, {
        autoIndex: false
    }),
    disconnect: () => mongoose.disconnect(),
    drop: () => mongoose.connection.dropDatabase()
};