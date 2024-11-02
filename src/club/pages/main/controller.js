export default ({
    services: { Club }
}) => async (req, res) => {
    const meetings = await Club.getMeetings();

    res.render('pages/main', {
        meetings
    });
};