module.exports = ({ Meeting }) => ({
    show: (req, res, next) => {
        Meeting.getOne({
            _id: req.params.id,
            status: 'scheduled',
            published: true
        })
            .then(meeting => {
                if (!meeting) {
                    req.flash('error', 'Встреча не найдена');
                    return res.redirect('/');
                }

                const approvedRegistrations = meeting.registrations.filter(r => r.status === 'approved').length;

                res.render('meeting', {
                    id: 'meeting',
                    meeting,
                    approvedRegistrations
                });
            })
            .catch(next);
    },

    register: (req, res, next) => {
        const registration = {
            registrant: req.body
        };

        Meeting.getById(req.params.id)
            .then(meeting => Meeting.addRegistration(meeting, registration))
            .then(() => {
                req.flash('success', 'Вы зарегистрированы. После подтверждения вам на почту придет ссылка для входа. До встречи!');
                ;
            })
            .catch(error => {
                req.flash('error', `Не удалось вас зарегистрировать. Попробуйте еще раз. (Ошибка: ${error.message})`);
            })
            .finally(() => res.redirect('back'));
    }
});