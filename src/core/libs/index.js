import MailJet from './mailjet';
import Twilio from './twilio';
import Zoom from './zoom';

export default config => ({
    mailjet: MailJet(config),
    twilio: Twilio(config),
    zoom: Zoom({
        accountId: config.ZOOM_ACCOUNT_ID,
        clientId: config.ZOOM_CLIENT_ID,
        clientSecret: config.ZOOM_CLIENT_SECRET,
        userId: config.ZOOM_USER_ID
    })
});