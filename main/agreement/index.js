module.exports = (req, res) =>
    res.render('shared/views/pages/agreement', {
        id: 'agreement',
        title: 'Пользовательское соглашение'
    });