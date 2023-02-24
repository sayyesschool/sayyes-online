module.exports = (req, res, next) =>
    (req.user?.role === 'teacher') ? next() : next('router');