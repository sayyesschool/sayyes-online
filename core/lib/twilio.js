const twilio = require('twilio');

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const SyncGrant = AccessToken.SyncGrant;

module.exports = ({
    TWILIO_ACCOUNT_ID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    TWILIO_CHAT_SERVICE_ID,
    TWILIO_SYNC_SERVICE_ID
}) => {
    return {
        generateVideoToken: ({ identity }) => {
            const token = new AccessToken(
                TWILIO_ACCOUNT_ID,
                TWILIO_API_KEY,
                TWILIO_API_SECRET
            );
            const videoGrant = new VideoGrant();

            token.identity = identity;
            token.addGrant(videoGrant);

            return token.toJwt();
        },

        generateChatToken: ({ identity }) => {
            const token = new AccessToken(
                TWILIO_ACCOUNT_ID,
                TWILIO_API_KEY,
                TWILIO_API_SECRET
            );
            const appName = 'TwilioChat';
            //const endpointId = appName + ':' + identity + ':' + deviceId;
            const chatGrant = new ChatGrant({
                serviceSid: TWILIO_CHAT_SERVICE_ID
            });

            token.identity = identity;
            token.addGrant(chatGrant);

            return token.toJwt();
        },

        generateSyncToken: ({ identity }) => {
            const token = new AccessToken(
                TWILIO_ACCOUNT_ID,
                TWILIO_API_KEY,
                TWILIO_API_SECRET
            );

            const syncGrant = new SyncGrant({ serviceSid: TWILIO_SYNC_SERVICE_ID });

            token.identity = identity;
            token.addGrant(syncGrant);

            return token.toJwt();
        }
    };
};