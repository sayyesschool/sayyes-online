import Mailjet from 'node-mailjet';

export default ({ MAILJET_API_KEY, MAILJET_API_SECRET }) => new Mailjet({
    apiKey: MAILJET_API_KEY,
    apiSecret: MAILJET_API_SECRET
});