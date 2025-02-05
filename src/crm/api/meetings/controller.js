export default ({
    services: { Club }
}) => ({
    async get(req, res) {
        const meetings = await Club.findMeetings(req.query)
            .populate('host', 'firstname lastname email')
            .populate('registrations')
            .sort({ date: 1 })
            .limit(100);

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

    async update(req, res) {
        const meeting = await Club.updateMeeting(req.params.meetingId, req.body);

        res.json({
            ok: true,
            message: 'Встреча изменена',
            data: meeting
        });
    },

    async delete(req, res) {
        const meeting = await Club.deleteMeeting(req.params.meetingId);

        res.json({
            ok: true,
            message: 'Встреча удалена',
            data: {
                id: meeting.id
            }
        });
    },

    async createRegistration(req, res) {
        const registration = await Club.registerForMeeting(
            req.body.userId,
            req.params.meetingId,
            {
                approve: true,
                force: req.body.force,
                notify: req.body.notify
            }
        );

        res.json({
            ok: true,
            message: 'Регистрация создана',
            data: registration
        });
    },

    async updateRegistration(req, res) {
        const registration = await Club.updateRegistration(
            req.params.meetingId,
            req.params.registrationId,
            req.body
        );

        res.json({
            ok: true,
            message: 'Регистрация изменена',
            data: registration
        });
    },

    async deleteRegistration(req, res) {
        const registration = await Club.deleteRegistration(
            req.params.meetingId,
            req.params.registrationId
        );

        res.json({
            ok: true,
            message: 'Регистрация удалена',
            data: registration
        });
    }
});