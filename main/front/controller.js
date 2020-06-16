module.exports = ({ Auth, Mail }, data) => ({
    showFront: (req, res) => {
        res.render('front', {
            id: 'front',
            ...data
        });
    },

    request: (req, res, next) => {
        const { name, phone } = req.body;

        Mail.send({
            subject: 'Разговорный клуб SAY YES - Обратный звонок',
            html: `<p>${name} заказал обратный звонок на номер ${phone}.<p>`,
            to: [{
                email: 'club@sayes.ru'
            }]
        }).then(() => {
            req.flash('success', 'Заявка на обратный звонок принята. Мы перезвоним вам в ближайшее время!');
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