import data from './data';

export default ({
    services: { Club }
}) => async (req, res) => {
    const packs = await Club.getPacks();
    const meetings = await Club.findMeetings();

    res.render('pages/main', {
        trialPack: packs[0],
        packs,
        meetings,
        ...data
    });
};