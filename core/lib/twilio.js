const twilio = require('twilio');
const { TWILIO_ACCOUNT_ID, TWILIO_API_KEY, TWILIO_API_SECRET } = require('../config');

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

module.exports = {
    generateToken: lesson => {
        const token = new AccessToken(
            TWILIO_ACCOUNT_ID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET
        );
        const videoGrant = new VideoGrant({
            room: lesson.id
        });

        token.identity = lesson.student;

        token.addGrant(videoGrant);

        return token.toJwt();
    }
};