const { Schema } = require('mongoose');

const Exercise = new Schema({
    slug: { type: String },
    title: { type: String }
});

module.exports = Exercise;