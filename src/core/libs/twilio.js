const twilio = require('twilio');

const MAX_ALLOWED_SESSION_DURATION = 14400;
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
        generateVideoToken: ({ identity, room }) => {
            const token = new AccessToken(
                TWILIO_ACCOUNT_ID,
                TWILIO_API_KEY,
                TWILIO_API_SECRET,
                {
                    ttl: MAX_ALLOWED_SESSION_DURATION
                }
            );
            const videoGrant = new VideoGrant({ room });

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