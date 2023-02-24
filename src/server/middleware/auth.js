module.exports = {
    authenticatedRoute: (req, res, next) =>
        req.user ? next() : next('route'),

    authenticatedRouter: (req, res, next) =>
        req.user ? next() : next('router')
};