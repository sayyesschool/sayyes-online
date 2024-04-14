import flash from 'connect-flash';

export default [
    flash(),
    (req, res, next) => {
        res.locals.flash = req.flash();

        next();
    }
];