const { Schema } = require('mongoose');

const Person = require('./person');

const Contact = new Schema([Person, {
    relation: { type: String },
    occupation: { type: String },
    note: { type: String, trim: true }
}]);

module.exports = Contact;