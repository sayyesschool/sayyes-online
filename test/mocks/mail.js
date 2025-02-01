import { mock } from 'test/helpers';

export default {
    send: mock.fn(async messages => {
        console.log({ messages });

        return {
            Messages: [
                {
                    Status: 'success',
                    Errors: [
                        {
                            'ErrorIdentifier': '1ab23cd4-e567-8901-2345-6789f0gh1i2j',
                            'ErrorCode': 'send-0010',
                            'StatusCode': 400,
                            'ErrorMessage': 'Template ID "123456789" doesn\'t exist for your account.',
                            'ErrorRelatedTo': 'TemplateID'
                        }
                    ],
                    CustomID: 'CustomValue',
                    To: [
                        {
                            'Email': 'passenger@mailjet.com',
                            'MessageUUID': '1ab23cd4-e567-8901-2345-6789f0gh1i2j',
                            'MessageID': 1234567890987654400,
                            'MessageHref': 'https://api.mailjet.com/v3/message/1234567890987654321'
                        }
                    ],
                    Cc: [
                        {
                            'Email': 'passenger2@mailjet.com',
                            'MessageUUID': '9ab87cd6-e567-8901-2345-6789f0gh1i2j',
                            'MessageID': 9876543210987655000,
                            'MessageHref': 'https://api.mailjet.com/v3/message/9876543210987654321'
                        }
                    ],
                    Bcc: [
                        {
                            'Email': 'passenger3@mailjet.com',
                            'MessageUUID': '9ab87cd6-e567-8901-2345-1234ab4321ba',
                            'MessageID': 123123123321321330,
                            'MessageHref': 'https://api.mailjet.com/v3/message/123123123321321321'
                        }
                    ]
                }
            ]
        };
    })
};