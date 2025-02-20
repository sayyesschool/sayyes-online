import mongoose, { Document, isObjectIdOrHexString, isValidObjectId } from 'mongoose';

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

mongoose.plugin(function addResolve(schema) {
    schema.statics.resolve = function resolve(arg) {
        if (!arg)
            throw new Error('Argument is required');

        if (arg instanceof Document)
            return Promise.resolve(arg);

        else if (isObjectIdOrHexString(arg))
            return this.findById(arg);

        else if (typeof arg === 'object' && isObjectIdOrHexString(arg?.id))
            return this.hydrate(arg, undefined, {
                hydratedPopulatedDocs: true
            });

        else
            return this.findOne(arg);
    };

    schema.statics.update = function update(query, ...args) {
        return isValidObjectId(query) ?
            this.findByIdAndUpdate(query, ...args) :
            this.findOneAndUpdate(query, ...args);
    };

    schema.statics.delete = function remove(query, ...args) {
        return isValidObjectId(query) ?
            this.findByIdAndDelete(query, ...args) :
            this.findOneAndDelete(query, ...args);
    };
});

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));
mongoose.connection.on('error', () => console.error('DB connection error:'));

process.on('SIGINT', async () => {
    console.log('SIGINT signal received');

    await mongoose.connection.close();

    console.log('Process terminated');
    process.exit(0);
});

export default ({
    DB_CONNECTION_STRING
}) => ({
    connection: mongoose.connection,

    async connect(uri = DB_CONNECTION_STRING) {
        return mongoose.connect(uri, {
            autoIndex: false
        });
    },

    async disconnect() {
        return mongoose.disconnect();
    },

    async drop() {
        return mongoose.connection.dropDatabase().catch(() => {
            for (const name in mongoose.connection.collections) {
                mongoose.connection.dropCollection(name);
            }
        });
    }
});