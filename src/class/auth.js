module.exports = (req, res, next) => (
    req.user?.role === 'admin' ||
    req.user?.role === 'client' ||
    req.user?.role === 'teacher'
) ? next() : next('router');