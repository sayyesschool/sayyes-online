const { User } = require('../services');

module.exports = (req, res, next) => {
    if (!req.session.userId) return next();

    User.getById(req.session.userId).then(user => {
        req.user = user;

        next();
    });
};