module.exports = (req, res, next) =>
    (req.user && req.user.role === 'teacher') ? next() : next('router');