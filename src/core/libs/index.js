import MailJet from './mailjet';
import Twilio from './twilio';
import Zoom from './zoom';

export default config => ({
    mailjet: MailJet(config),
    twilio: Twilio(config),
    zoom: Zoom(config)
});