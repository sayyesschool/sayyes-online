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

    async getOne(req, res) {
        const meeting = await Club.getMeeting(req.params.meetingId, {
            populate: {
                path: 'registrations', populate: { path: 'user' }
            }
        });

        res.json({
            ok: true,
            data: meeting
        });
    },

    async create(req, res) {
        const meeting = await Club.createMeeting(req.body);

        res.json({
            ok: true,
            message: 'Встреча создана',
            data: meeting
        });
    },

    async update(req, res, next) {
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

    async delete(req, res, next) {
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

    async addRegistration(req, res, next) {
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

    async updateRegistration(req, res, next) {
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

    async removeRegistration(req, res, next) {
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