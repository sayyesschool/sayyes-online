const { Router } = require('express');

const router = Router();

router.use((req, res) => {
    res.render('shared/views/pages/not-found', {
        id: 'not-found',
        title: 'Не найдено'
    });
});

router.use((error, req, res, next) => {
    console.error(error);

    error.message = error.message || 'Что-то пошло не так :(';

    res.status(error.status || 500);

    if (error.status === 500) {
        res.render('shared/views/pages/error', {
            id: 'error',
            title: 'Ошибка',
            error
        });
    } else {
        req.flash('error', error.message);
        res.redirect('back');
    }
});

module.exports = router;