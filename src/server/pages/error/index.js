// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => { // `next` is needed for this function to be an error handler
    console.error(error);

    error.message = error.message || 'Что-то пошло не так :(';

    res.status(error.code || error.status || 500);

    if (error.status === 500) {
        res.render('server/pages/error', {
            id: 'error',
            title: 'Ошибка',
            error
        });
    } else {
        req.flash('error', error.message);
        res.redirect('back');
    }
};