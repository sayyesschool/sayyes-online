export default ({
    models: { User },
    services: { Club }
}) => ({
    async get(req, res) {
        const meetings = await Club.findMeetings(req.query)
            .populate('registrations')
            .sort({ date: 1 })
            .limit(30);

        res.json({
            ok: true,
            data: meetings
        });
    },

    getOne: (req, res, next) => {
        Club.getMeeting(req.params.meetingId)
            .populate({ path: 'registrations', populate: { path: 'user' } })
            .then(meeting => {
                res.json({
                    ok: true,
                    data: meeting
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Club.createMeeting(req.body)
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
        Club.updateMeeting(req.params.meetingId, req.body)
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
        Club.deleteMeeting(req.params.meetingId)
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
                    return Club.registerForMeeting(user, req.params.meetingId).then(([meeting]) => meeting);
                } else {
                    return Club.addRegistration(user, req.params.meetingId);
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
        Club.updateRegistration(req.params.meetingId, req.params.registrationId, req.body.action)
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
        Club.removeRegistration(req.params.meetingId, req.params.registrationId)
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