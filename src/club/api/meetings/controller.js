module.exports = ({
    libs: { datetime },
    services: { Meeting }
}) => ({
    index: (req, res, next) => {
        Meeting.get({ host: req.user })
            .sort({ date: -1 })
            .then(meetings => {
                const today = new Date();

                const scheduledMeetings = meetings.filter(m => datetime(m.date).isSameOrAfter(today, 'day'));
                const pastMeetings = meetings.filter(m => datetime(m.date).isBefore(today, 'day'));

                res.render('home', {
                    id: 'home',
                    meetings,
                    scheduledMeetings,
                    pastMeetings
                });
            })
            .catch(next);
    }
});