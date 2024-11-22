import expect from 'expect';

import MailClient from '@/core/libs/mailjet.js';
import MailService from '@/core/services/mail.js';

const mail = MailService(MailClient({
    apiKey: global.$context.config.MAILJET_API_KEY,
    apiSecret: global.$context.config.MAILJET_API_SECRET
}));

describe('Mail Service', () => {
    describe('send', () => {
        it('should send an email with the correct parameters', async () => {
            const emailData = {
                to: 'olegpolyakov@outlook.com',
                subject: 'Test Subject',
                text: 'Test Text',
                html: '<p>Test HTML</p>'
            };

            const result = await mail.send(emailData);

            console.log(result);

            expect(result).toExist();
        });
    });

    describe('sendMany', () => {
        it('should send multiple emails with the correct parameters', async () => {
            const messages = [
                {
                    to: 'olegpolyakov@outlook.com',
                    subject: 'Test Subject 1',
                    text: 'Test Text 1',
                    html: '<p>Test HTML 1</p>'
                },
                {
                    to: 'olegpolyakov@outlook.com',
                    subject: 'Test Subject 2',
                    text: 'Test Text 2',
                    html: '<p>Test HTML 2</p>'
                }
            ];

            const result = await mail.sendMany(messages);

            console.log(result);

            expect(result).toExist();
        });
    });
});