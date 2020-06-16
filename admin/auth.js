module.exports = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        res.locals.user = req.user;
        next();
    } else {
        res.redirect('/');
    }
};