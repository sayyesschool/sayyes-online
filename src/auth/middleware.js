module.exports = ({ User }) => ({
    user: (req, res, next) => {
        if (!req.session.userId) return next();

        User.findById(req.session.userId).then(user => {
            req.user = user;

            next();
        });
    }
});