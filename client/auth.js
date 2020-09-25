module.exports = (req, res, next) =>
    (req.user?.role === 'client') ? next() : next('router');