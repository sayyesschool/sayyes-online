export default ({
    models: { Meeting, User },
    services: { Club }
}) => ({
    async getMany(req, res) {
        const meetings = await Club.findMeetings();

        res.send({
            ok: true,
            data: meetings
        });
    },

    async getOne(req, res) {
        const meeting = await Club.findMeeting(req.params.id);

        res.send({
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

    async update(req, res) {
        const meeting = await Club.updateMeeting(req.params.meetingId, req.body);

        res.json({
            ok: true,
            message: 'Встреча изменена',
            data: meeting
        });
    },

    async delete(req, res) {
        await Club.deleteMeeting(req.params.meetingId);

        res.json({
            ok: true,
            message: 'Встреча удалена',
            data: {
                id: req.params.meetingId
            }
        });
    },

    async addRegistration(req, res, next) {
        User.findOne({ email: req.body.email }, 'firstname lastname email balance')
            .then(user => req.body.force ?
                Meeting.register(req.params.meetingId, user).then(([meeting]) => meeting) :
                Meeting.addRegistration(req.params.meetingId, user)
            ).then(meeting => {
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

    async removeRegistration(req, res, next) {
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