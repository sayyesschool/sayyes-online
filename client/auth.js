module.exports = (req, res, next) => {
    if (!req.user) return next('router');
    if (req.user.role === 'admin') return res.redirect('/admin');
    if (req.user.role === 'teacher') return res.redirect('/teacher');
    next();
};