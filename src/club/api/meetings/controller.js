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
        const meeting = await Club.getMeeting(req.params.meetingId);

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

    async createRegistration(req, res) {
        const registration = await Club.registerForMeeting(
            req.user.id,
            req.params.meetingId,
            req.body
        );

        res.json({
            ok: true,
            message: 'Регистрация добавлена',
            data: registration
        });
    },

    async updateRegistration(req, res) {
        const registration = await Club.updateRegistration(
            req.params.meetingId,
            req.params.registrationId,
            { status: req.body.status }
        );

        res.json({
            ok: true,
            message: 'Регистрация изменена',
            data: registration
        });
    },

    async deleteRegistration(req, res) {
        const registration = await Club.unregisterFromMeeting(
            req.user.id,
            req.params.meetingId
        );

        res.json({
            ok: true,
            message: 'Регистрация удалена',
            data: registration
        });
    }
});