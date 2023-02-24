module.exports = (req, res) => {
    res.render('front/not-found', {
        id: 'not-found',
        title: 'Не найдено'
    });
}; 