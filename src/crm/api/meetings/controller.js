module.exports = ({
    models: { User },
    services: { Meeting }
}) => ({
    get: (req, res, next) => {
        Meeting.get(req.query)
            .sort({ date: -1 })
            .limit(30)
            .populate('host')
            .then(meetings => {
                res.json({
                    ok: true,
                    data: meetings
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Meeting.getOne(req.params.meetingId)
            .populate('host')
            .populate('participants')
            .populate('registrations.user')
            .then(meeting => {
                res.json({
                    ok: true,
                    data: meeting
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Meeting.create(req.body)
            .then(meeting => {
                res.json({
                    ok: true,
                    message: 'Встреча создана',
                    data: meeting
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Meeting.update(req.params.meetingId, req.body)
            .then(meeting => {
                res.json({
                    ok: true,
                    message: 'Встреча изменена',
                    data: meeting
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Meeting.delete(req.params.meetingId)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Встреча удалена',
                    data: {
                        id: req.params.meetingId
                    }
                });
            })
            .catch(next);
    },

    addRegistration: (req, res, next) => {
        User.findOne({ email: req.body.email }, 'firstname lastname email balance')
            .then(user => {
                if (req.body.paid) {
                    return Meeting.register(req.params.meetingId, user).then(([meeting]) => meeting);
                } else {
                    return Meeting.addRegistration(req.params.meetingId, user);
                }
            }).then(meeting => {
                const registration = meeting.registrations.slice(-1);

                registration.meetingId = meeting.id;

                res.json({
                    ok: true,
                    message: 'Регистрация добавлена',
                    data: registration
                });
            })
            .catch(next);
    },

    updateRegistration: (req, res, next) => {
        Meeting.updateRegistration(req.params.meetingId, req.params.registrationId, req.body.action)
            .then(meeting => {
                const registration = meeting.registrations.find(r => r.id == req.params.registrationId);

                registration.meetingId = req.params.meetingId;

                res.json({
                    ok: true,
                    message: 'Регистрация изменена',
                    data: registration
                });
            })
            .catch(next);
    },

    removeRegistration: (req, res, next) => {
        Meeting.removeRegistration(req.params.meetingId, req.params.registrationId)
            .then(() => {
                const registration = {
                    id: req.params.registrationId,
                    meetingId: req.params.meetingId
                };

                res.json({
                    ok: true,
                    message: 'Регистрация удалена',
                    data: registration
                });
            })
            .catch(next);
    }
});