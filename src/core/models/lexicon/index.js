const { Schema } = require('mongoose');

const Lexicon = new Schema({
    lexemeId: { type: Schema.Types.ObjectId, required: true },
    status: {
        type: Number,
        min: 0 /* new */,
        max: 4 /* learned */,
        default: 0
    },
    reviewDate: { type: Date }
});

module.exports = Lexicon;