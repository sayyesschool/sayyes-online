module.exports = ({
    models: { Request },
    services: { Mail },
    data
}) => ({
    main: (req, res) => {
        res.render('front/main', {
            id: 'main',
            ...data
        });
    },

    request: (req, res, next) => {
        const { name, phone } = req.body;

        Request.create({
            contact: {
                name,
                phone
            }
        }).then(() => {
            req.flash('success', 'Заявка принята. Мы свяжимся с вамм в ближайшее время!');
            res.redirect('back');
        }).catch(next);
    },

    contact: (req, res, next) => {
        const { name, email, message } = req.body;

        Mail.send({
            subject: `Обратная связь от ${name} (${email})`,
            html: `<p>${name} (${email})</p><p>${message}</p>`,
            to: [{
                email: 'club@sayes.ru'
            }]
        }).then(() => {
            req.flash('success', 'Сообщение отправлено. Мы свяжемся с вами в ближайшее время!');
            res.redirect('back');
        }).catch(next);
    }
});