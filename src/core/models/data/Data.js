import { Schema } from 'mongoose';

export const Data = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true
});

Data.statics.get = async function (key) {
    const data = await this.findOne({ key });

    return data?.value;
};

export default Data;