import expect from 'expect';

import { context } from 'test/_env';

const {
    clients: { mail },
    services: { Mail }
} = context;

describe('Mail Service', () => {
    const email = {
        to: 'olegpolyakov@outlook.com',
        subject: 'Test Subject',
        text: 'Test Text',
        html: '<p>Test HTML</p>'
    };

    describe('send', () => {
        beforeEach(() => {
            mail.send.reset();
        });

        it('sends one email', async () => {
            const result = await Mail.send(email);

            expect(result).toExist();
            expect(mail.send).toHaveBeenCalled();
        });

        it('sends multiple emails', async () => {
            const result = await Mail.send([email, email, email]);

            expect(result).toExist();
            expect(mail.send).toHaveBeenCalled();
        });

        it('uses default from if not provided', async () => {
            const result = await Mail.send(email);

            expect(result).toExist();
            expect(mail.send).toHaveBeenCalledWith([{
                ...email,
                from: Mail.defaultFrom
            }]);
        });
    });
});