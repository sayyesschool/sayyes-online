export default ({
    services: { Club }
}) => async (req, res) => {
    const meetings = await Club.findMeetings();

    res.render('pages/main', {
        meetings
    });
};