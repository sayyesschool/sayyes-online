import { Recaptcha } from './captcha';
import { YooKassa } from './checkout';
import HolyHope from './hh';
import { MailJet as MailJetMail } from './mail';
import { MailJet as MailJetNewsletter } from './newsletter';
import { YandexCloudStorage } from './storage';
import Teams from './teams';
import Zoom from './zoom';

export default config => ({
    captcha: Recaptcha(config),
    checkout: YooKassa(config),
    hh: HolyHope(config),
    mail: MailJetMail(config),
    newsletter: MailJetNewsletter(config),
    storage: YandexCloudStorage(config),
    teams: Teams(config),
    zoom: Zoom(config)
});