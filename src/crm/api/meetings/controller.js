export default ({
    services: { Club }
}) => ({
    get: (req, res, next) => {
        Club.getMeetings(req.query)
            .sort({ date: 1 })
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
        Club.getMeeting(req.params.meetingId)
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
        const registration = {
            registrant: req.body,
            status: 'approved'
        };

        Club.addRegistration(req.params.meetingId, registration)
            .then(registration => {
                registration.meetingId = req.params.meetingId;

                res.json({
                    ok: true,
                    message: 'Регистрация подтверждена',
                    data: registration
                });
            })
            .catch(next);
    },

    approveRegistration: (req, res, next) => {
        Club.approveRegistration(req.params.meetingId, req.params.registrationId)
            .then(registration => {
                registration.meetingId = req.params.meetingId;

                res.json({
                    ok: true,
                    message: 'Регистрация подтверждена',
                    data: registration
                });
            })
            .catch(next);
    },

    updateRegistration: (req, res, next) => {
        const action = req.body.action;

        Club[`${action}Registration`](req.params.meetingId, req.params.registrationId)
            .then(registration => {
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
            .then(registration => {
                registration.meetingId = req.params.meetingId;

                res.json({
                    ok: true,
                    message: 'Регистрация удалена',
                    data: registration
                });
            })
            .catch(next);
    }
});