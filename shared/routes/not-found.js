module.exports = (req, res) => {
    res.render('shared/views/pages/not-found', {
        id: 'not-found',
        title: 'Не найдено'
    });
}; 