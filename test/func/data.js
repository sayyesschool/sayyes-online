import moment from 'moment';

import { models } from './context';

export const EMAIL = 'member@sayyes.school';

export const PACK_ID = '21dec724-4a40-48ef-9cf7-89f0fb3c4d07';

export const PACKS_MAP = {
    1: '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
    4: '3f7eb11c-12c5-4631-af4a-39855ca17810',
    8: '3d678c9b-632d-492a-aaad-e1ced4f35255',
    16: '8012db3e-b720-48ea-95a9-ba42772da33d'
};

export const DEFAULT_USER = {
    firstname: 'User',
    email: 'user@sayyes.school'
};
export const USER = new models.User(DEFAULT_USER);
export const USER_ID = USER.id;
export const USER_EMAIL = USER.email;

export const DEFAULT_MEETING = {
    title: 'Test Meeting'
};

export const FREE_MEETING = {
    title: 'Test Meeting',
    free: true
};

export const ZOOM_MEETING = {
    ...DEFAULT_MEETING,
    zoomId: '1234567890'
};

export const DEFAULT_TICKET = {
    limit: 1,
    expiresAt: moment().add(2, 'week').toDate()
};

export const EXPIRED_TICKET = {
    limit: 1,
    expiresAt: moment().subtract(2, 'week').toDate()
};

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
        packId: PACK_ID,
        email: USER.email,
        name: USER.firstname
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
        packId: PACK_ID,
        email: USER.email,
        name: USER.firstname
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