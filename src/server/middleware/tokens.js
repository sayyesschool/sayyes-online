module.exports = twilio => (req, res, next) => {
    const options = {
        identity: req.user.id,
        friendlyName: req.user.fullname,
        room: req.params.id
    };

    res.locals.TWILIO_CHAT_TOKEN = twilio.generateChatToken(options);
    res.locals.TWILIO_VIDEO_TOKEN = twilio.generateVideoToken(options);
    res.locals.TWILIO_SYNC_TOKEN = twilio.generateSyncToken(options);

    next();
};