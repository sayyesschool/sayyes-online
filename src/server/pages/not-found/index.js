module.exports = (req, res) => {
    res.render('pages/not-found', {
        id: 'not-found',
        title: 'Не найдено'
    });
}; 