import MailJet from './mailjet';
import Twilio from './twilio';
import Zoom from './zoom';

export default config => ({
    mailjet: MailJet({
        apiKey: config.MAILJET_API_KEY,
        apiSecret: config.MAILJET_API_SECRET
    }),
    twilio: Twilio(config),
    zoom: Zoom({
        accountId: config.ZOOM_ACCOUNT_ID,
        clientId: config.ZOOM_CLIENT_ID,
        clientSecret: config.ZOOM_CLIENT_SECRET,
        userId: config.ZOOM_USER_ID
    })
});