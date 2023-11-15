module.exports = ({
    services: { Meeting }
}) => ({
    find: (req, res, next, id) => {
        Meeting.getOne(id)
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

    get: (req, res, next) => {
        Meeting.get({
            published: true,
            $or: [
                { date: { $gte: new Date() } },
                { 'registrations.user': req.user.id }
            ]
        }).then(meetings => {
            res.json({
                ok: true,
                meetings: meetings.map(meeting => mapMeeting(meeting, req.user))
            });
        }).catch(next);
    },

    register: (req, res, next) => {
        Meeting.register(req.meeting, req.user)
            .then(([meeting, user]) => {
                res.json({
                    ok: true,
                    message: 'Вы зарегистрированы на встречу',
                    data: {
                        meeting: mapMeeting(meeting, user),
                        balance: user.balance
                    }
                });
            }).catch(next);
    },

    unregister: (req, res, next) => {
        Meeting.unregister(req.meeting, req.user)
            .then(([meeting, user]) => {
                res.json({
                    ok: true,
                    message: 'Регистрация на встречу отменена',
                    data: {
                        meeting: mapMeeting(meeting, user),
                        balance: user.balance
                    }
                });
            })
            .catch(next);
    }
});

function mapMeeting(meeting, user) {
    const object = meeting.toJSON();
    const registration = meeting.registrations.find(r => r.user == user.id);

    object.zoomId = undefined;
    object.startUrl = undefined;
    object.registrations = meeting.registrations.length;
    object.host = {
        fullname: meeting.host.fullname,
        avatarUrl: meeting.host.avatarUrl
    };

    if (registration) {
        object.isRegistered = registration.status === 'approved';
        object.isPending = registration.status === 'pending';
        object.hasParticipated = registration.participated;
        object.joinUrl = registration.joinUrl;
    }

    return object;
}