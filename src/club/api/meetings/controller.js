export default ({
    services: { Club }
}) => ({
    async getMany(req, res) {
        const query = {
            ...req.query,
            status: { $ne: 'canceled' }
        };
        const meetings = req.user.isTeacher ?
            await Club.findMeetings(query)
                .populate({ path: 'registrations', populate: { path: 'user' } })
                .sort({ date: 1 }) :
            await Club.findMeetings(query)
                .populate('registrations')
                .sort({ date: 1 });

        res.send({
            ok: true,
            data: meetings.map(meeting => mapMeeting(meeting, req.user.id))
        });
    },

    async getOne(req, res) {
        const meeting = await Club.getMeeting(req.params.meetingId);

        res.send({
            ok: true,
            data: mapMeeting(meeting, req.user.id)
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

    async join(req, res) {
        const meeting = await Club.getMeeting(req.params.meetingId);
        const registration = await Club.getRegistrationByUser(req.user.id);

        if (registration.joinUrl || meeting.joinUrl) {
            res.redirect(registration.joinUrl);
        } else {
            res.redirect('back');
        }
    },

    async start(req, res) {
        const meeting = await Club.getMeeting(req.params.meetingId);

        console.log('START', meeting.hostId, req.user.id);

        if (meeting.hostId == req.user.id) {
            res.redirect(meeting.startUrl);
        } else {
            res.redirect('back');
        }
    },

    async createRegistration(req, res) {
        const registration = await Club.registerForMeeting(
            req.user.id,
            req.params.meetingId,
            req.body
        );

        res.json({
            ok: true,
            message: 'Запись на встречу создана',
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
            message: 'Запись на встречу изменена',
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
            message: 'Запись на встречу удалена',
            data: registration
        });
    }
});

function mapMeeting(meeting, userId) {
    const registration = meeting.registrations?.find(r => r.userId == userId);

    return {
        ...meeting.toJSON(),
        isRegistered: registration?.userId == userId && registration.isApproved,
        joinUrl: (registration?.joinUrl || meeting.joinUrl) && `/meetings/${meeting.id}/join`
    };
}