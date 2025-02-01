import { YooKassa } from './checkout';
import HolyHope from './hh';
import { MailJet as MailJetMail } from './mail';
import { MailJet as MailJetNewsletter } from './newsletter';
import { YandexCloudStorage } from './storage';
import Zoom from './zoom';

export default config => ({
    checkout: YooKassa(config),
    hh: HolyHope(config),
    mail: MailJetMail(config),
    newsletter: MailJetNewsletter(config),
    storage: YandexCloudStorage(config),
    zoom: Zoom(config)
});