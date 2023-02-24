const flash = require('connect-flash');

module.exports = [
    flash(),
    (req, res, next) => {
        res.locals.flash = req.flash();

        next();
    }
];