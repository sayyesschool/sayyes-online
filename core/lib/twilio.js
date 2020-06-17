const twilio = require('twilio');
const { TWILIO_ACCOUNT_ID, TWILIO_CHAT_SERVICE_ID, TWILIO_API_KEY, TWILIO_API_SECRET } = require('../config');

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;

module.exports = {
    generateVideoToken: ({ room, identity }) => {
        const token = new AccessToken(
            TWILIO_ACCOUNT_ID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET
        );
        const videoGrant = new VideoGrant({ room });

        token.identity = identity;
        token.addGrant(videoGrant);

        return token.toJwt();
    },

    generateChatToken: ({ identity, deviceId }) => {
        const appName = 'TwilioChat';
        const endpointId = appName + ':' + identity + ':' + deviceId;
        const token = new AccessToken(
            TWILIO_ACCOUNT_ID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET
        );
        const chatGrant = new ChatGrant({
            serviceSid: TWILIO_CHAT_SERVICE_ID,
            endpointId
        });

        token.identity = identity;
        token.addGrant(chatGrant);

        return token.toJwt();
    }
};