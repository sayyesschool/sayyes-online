import Mailjet from 'node-mailjet';

export default ({ apiKey, apiSecret }) => new Mailjet({
    apiKey,
    apiSecret
});