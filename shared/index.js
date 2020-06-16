const common = require('./routes/common');
const legal = require('./routes/legal');
const errors = require('./routes/errors');

module.exports = {
    routes: {
        common,
        legal,
        errors
    }
};