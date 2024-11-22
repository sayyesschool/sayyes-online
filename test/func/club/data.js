export const EMAIL = 'member@sayyes.school';
export const PACK_ID = '21dec724-4a40-48ef-9cf7-89f0fb3c4d07';

export const NEW_PAYMENT = {
    id: '67396380b89cda530ef7fb11',
    uuid: '2ecb773f-000f-5000-a000-17e41bfba39c',
    amount: 590,
    currency: 'RUB',
    status: 'pending',
    paid: false,
    refundable: false,
    refunded: false,
    test: true,
    description: 'Покупка 1 занятие в разговорном клубе',
    confirmation: {
        type: 'embedded',
        confirmationToken: 'ct-2ecb773f-000f-5000-a000-17e41bfba39c'
    },
    metadata: {
        packId: '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
        email: 'member@sayyes.school',
        name: 'Member'
    },
    createdAt: '2024-11-17T03:31:11.863Z',
    updatedAt: '2024-11-17T03:31:11.863Z',
    url: '/payments/67396380b89cda530ef7fb11',
    dateLabel: '17.11.2024',
    statusLabel: 'В обработке',
    statusIcon: 'hourglass_empty',
    isPending: true,
    isWaitingForCapture: false,
    isSucceeded: false,
    isCanceled: false,
    isResolved: false,
    isStuck: false
};

export const PAID_PAYMENT = {
    id: '67396380b89cda530ef7fb11',
    uuid: '2ecb773f-000f-5000-a000-17e41bfba39c',
    amount: 590,
    currency: 'RUB',
    status: 'succeeded',
    paid: true,
    refundable: false,
    refunded: false,
    test: true,
    description: 'Покупка 1 занятие в разговорном клубе',
    confirmation: {
        type: 'embedded',
        confirmationToken: 'ct-2ecb773f-000f-5000-a000-17e41bfba39c'
    },
    metadata: {
        packId: '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
        email: 'member@sayyes.school',
        name: 'Member'
    },
    createdAt: '2024-11-17T03:31:11.863Z',
    updatedAt: '2024-11-17T03:31:11.863Z',
    url: '/payments/67396380b89cda530ef7fb11',
    dateLabel: '17.11.2024',
    statusLabel: 'В обработке',
    statusIcon: 'hourglass_empty',
    isPending: false,
    isWaitingForCapture: false,
    isSucceeded: true,
    isCanceled: false,
    isResolved: false,
    isStuck: false
};