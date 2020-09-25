module.exports = (req, res, next) =>
    (req.user?.role === 'manager') ? next() : next('router');