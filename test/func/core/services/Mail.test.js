import expect from 'expect';

import context from 'test/func/context';

const {
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
        it('sends an email', async () => {
            const result = await Mail.send(email);

            expect(result).toExist();
        });
    });
});