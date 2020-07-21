const { Schema } = require('mongoose');

const Client = new Schema();

Client.virtual('requests', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'client'
});

module.exports = Client;