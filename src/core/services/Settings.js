export default ({
    models: { Data }
}) => ({
    async getAll() {
        const settings = await Data.find();

        return settings;
    },

    async get(key) {
        const setting = await Data.findOne({ key });

        return setting ? setting.value : null;
    },

    async set(key, value) {
        return Data.findOneAndUpdate({ key }, { value }, {
            upsert: true,
            new: true
        });
    }
});