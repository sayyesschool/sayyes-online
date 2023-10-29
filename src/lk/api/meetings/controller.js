module.exports = ({
    models: { Meeting, Ticket },
    services: { Club },
}, { mapMeeting, mapTicket }) => ({
    find: (req, res, next, id) => {
        Club.getMeeting(id)
            .then(meeting => {
                if (!meeting) {
                    const error = new Error('Мероприятие не найдено');
                    error.status = 404;
                    return next(error);
                }

                req.meeting = meeting;

                next();
            })
            .catch(next);
    },

    getMany: (req, res, next) => {
        Club.getMeetings({
            published: true,
        })
            .then(meetings => {
                res.json({
                    ok: true,
                    data: meetings.map(meeting => mapMeeting(meeting, req.user))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        res.json({
            ok: true,
            data: mapMeeting(req.meeting, req.user)
        });
    },

    register: (req, res, next) => {
        if (req.body.isStudent) {
            Club.addRegistration(req.meeting, {
                user: req.user.id,
                registrant: {
                    email: req.user.email,
                    firstname: req.user.firstname,
                    lastname: req.user.lastname
                }
            }).then(() => {
                res.json({
                    ok: true,
                    message: 'Заявка на регистрацию принята',
                    data: mapMeeting(req.meeting, req.user)
                });
            }).catch(next);
        } else {
            Ticket.getOne({ user: req.user, meeting: { $exists: false } })
                .then(ticket => Meeting.register(req.meeting, req.user, ticket))
                .then(([meeting, ticket]) => {
                    res.json({
                        ok: true,
                        message: 'Вы зарегистрированы на встречу',
                        data: mapMeeting(meeting, req.user)
                    });
                })
                .catch(next);
        }
    },

    unregister: (req, res, next) => {
        Club.unregister(req.meeting, req.user)
            .then(([meeting, ticket]) => {
                res.json({
                    ok: true,
                    message: 'Регистрация на встречу отменена',
                    data: mapMeeting(meeting, req.user)
                });
            })
            .catch(next);
    }
});