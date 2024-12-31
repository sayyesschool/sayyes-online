import moment from 'moment';

import { models } from './context';

export const EMAIL = 'user@sayyes.school';

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

export const DEFAULT_MEMBERSHIP = {
    limit: 1,
    expiresAt: moment().add(2, 'week').toDate()
};

export const EXPIRED_MEMBERSHIP = {
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

export const TEST_RESULTS = {
    name: 'Test',
    email: 'olegpolyakov@outlook.com',
    questions: [
        {
            id: 1,
            content: '<p>- Are you on vacation?</p><p>- <span class="blank"></span></p>',
            options: [
                { content: 'Yes, I be.', correct: false },
                { content: 'Yes, I do.', correct: false },
                { content: 'Yes, I is.', correct: false },
                { content: 'Yes I am.', correct: true }
            ],
            answer: 'Yes I am.',
            topic: 'To be',
            level: 1
        },
        {
            id: 2,
            content: '<p>I <span class="blank"></span> up early every morning.</p>',
            options: [
                { content: 'get', correct: true },
                { content: 'gets', correct: false },
                { content: 'am getting', correct: false },
                { content: 'get', correct: false }
            ],
            answer: 'gets',
            topic: 'Present Simple',
            level: 1
        },
        {
            id: 3,
            content: '<p>What time <span class="blank"></span> go to work?</p>',
            options: [
                { content: 'do they', correct: false },
                { content: 'do she', correct: false },
                { content: 'is he', correct: false },
                { content: 'does he', correct: true }
            ],
            answer: 'does he',
            topic: 'Present Simple',
            level: 1
        },
        {
            id: 4,
            content: '<p><span class="blank"></span> a park near my house.</p>',
            options: [
                { content: 'It is', correct: false },
                { content: 'There is', correct: true },
                { content: 'They are', correct: false },
                { content: 'There are', correct: false }
            ],
            answer: 'There is',
            topic: 'There is/are',
            level: 1
        },
        {
            id: 5,
            content: '<p>Did you have a favorite toy when you <span class="blank"></span> a kid?</p>',
            options: [
                { content: 'was', correct: false },
                { content: 'are', correct: false },
                { content: 'be', correct: false },
                { content: 'were', correct: true }
            ],
            answer: 'were',
            topic: 'To be',
            level: 1
        },
        {
            id: 6,
            content: '<p>- What\'s the weather forecast for tomorrow?<br>- It <span class="blank"></span> tomorrow again.</p>',
            options: [
                { content: 'rains', correct: false },
                { content: 'is raining', correct: false },
                { content: 'is going to rain', correct: true },
                { content: 'rained', correct: false }
            ],
            answer: 'is raining',
            topic: 'To be going to',
            level: 2
        },
        {
            id: 7,
            content: '<p>- What <span class="blank"></span> when you broke your arm?<br>- I was climbing a tree.</p>',
            options: [
                { content: 'are you doing', correct: false },
                { content: 'did you do', correct: false },
                { content: 'were you doing', correct: true },
                { content: 'do you do', correct: false }
            ],
            answer: 'were you doing',
            topic: 'Past Continuous',
            level: 2
        },
        {
            id: 8,
            content: '<p>I <span class="blank"></span> be at the hotel after 8p.m.</p>',
            options: [
                { content: 'maybe', correct: false },
                { content: 'will be', correct: false },
                { content: 'might', correct: true },
                { content: 'might to', correct: false }
            ],
            answer: 'might to',
            topic: 'Might',
            level: 2
        },
        {
            id: 9,
            content: '<p>If Rebecca <span class="blank"></span> go to college, her parents will be disappointed.</p>',
            options: [
                { content: 'won\'t', correct: false },
                { content: 'don\'t', correct: false },
                { content: 'doesn\'t', correct: true },
                { content: 'will', correct: false }
            ],
            answer: 'won\'t',
            topic: 'Conditional sentences',
            level: 2
        },
        {
            id: 10,
            content: '<p>- I\'m not a good tennis player.<br>- <span class="blank"></span></p>',
            options: [
                { content: 'I\'m not too.', correct: false },
                { content: 'I\'m not either.', correct: true },
                { content: 'I don\'t too.', correct: false },
                { content: 'I don\'t neither.', correct: false }
            ],
            answer: 'I\'m not either.',
            topic: 'Too/Either',
            level: 2
        },
        {
            id: 11,
            content: '<p>I <span class="blank"></span> over to my sister\'s house a lot.</p>',
            options: [
                { content: 'was used to go', correct: false },
                { content: 'used to go', correct: true },
                { content: 'would to go', correct: false },
                { content: 'used to going', correct: false }
            ],
            answer: 'would to go',
            topic: 'Used to',
            level: 3
        },
        {
            id: 12,
            content: '<p>When I was a kid, my parents always made me <span class="blank"></span> my homework.</p>',
            options: [
                { content: 'to do', correct: false },
                { content: 'doing', correct: false },
                { content: 'do', correct: true },
                { content: 'did', correct: false }
            ],
            answer: 'doing',
            topic: 'Infinitives',
            level: 3
        },
        {
            id: 13,
            content: '<p>I wish I <span class="blank"></span> something more exciting with my life.</p>',
            options: [
                { content: 'do', correct: false },
                { content: 'can do', correct: false },
                { content: 'will do', correct: false },
                { content: 'could do', correct: true }
            ],
            answer: 'could do',
            topic: 'I wish',
            level: 3
        },
        {
            id: 14,
            content: '<p>Anna <span class="blank"></span> an art class since September, and she loves it.</p>',
            options: [
                { content: 'is taking', correct: false },
                { content: 'has taken', correct: false },
                { content: 'took', correct: false },
                { content: 'has been taking', correct: true }
            ],
            answer: 'took',
            topic: 'Present Perfect Continuous',
            level: 3
        },
        {
            id: 15,
            content: '<p>Several flights <span class="blank"></span> earlier today because of severe thunderstorms.</p>',
            options: [
                { content: 'was delayed', correct: false },
                { content: 'delayed', correct: false },
                { content: 'were delayed', correct: true },
                { content: 'be delayed', correct: false }
            ],
            answer: 'was delayed',
            topic: 'Passive Voice',
            level: 3
        },
        {
            id: 16,
            content: '<p>We <span class="blank"></span> to a soccer game last night, but the weather was awful, so we stayed home.</p>',
            options: [
                { content: 'are supposed to go', correct: false },
                { content: 'are going to go', correct: false },
                { content: 'went', correct: false },
                { content: 'were supposed to go', correct: true }
            ],
            answer: 'were supposed to go',
            topic: 'Be supposed to',
            level: 4
        },
        {
            id: 17,
            content: '<p>Last week I ran into an old friend of mine whom I <span class="blank"></span> in a long time.</p>',
            options: [
                { content: 'haven\'t seen', correct: false },
                { content: 'didn\'t see', correct: false },
                { content: 'wasn\'t seeing', correct: false },
                { content: 'hadn\'t seen', correct: true }
            ],
            answer: 'didn\'t see',
            topic: 'Past Perfect',
            level: 4
        },
        {
            id: 18,
            content: '<p>We\'d love to get our neighbors <span class="blank"></span> their yard. It\'s really a mess!</p>',
            options: [
                { content: 'cleaned up', correct: false },
                { content: 'will clean up', correct: false },
                { content: 'to clean up', correct: true },
                { content: 'clean up', correct: false }
            ],
            answer: 'clean up',
            topic: 'Infinitive',
            level: 4
        },
        {
            id: 19,
            content: '<p>If Dennis had been in the right place at the right time, his career <span class="blank"></span>.</p>',
            options: [
                { content: 'would take off', correct: false },
                { content: 'is taking off', correct: false },
                { content: 'has taken off', correct: false },
                { content: 'would have taken off', correct: true }
            ],
            answer: 'has taken off',
            topic: 'Conditional Sentences',
            level: 4
        },
        {
            id: 20,
            content: '<p>She asked me <span class="blank"></span>.</p>',
            options: [
                { content: 'whether I could stick to a monthly budget', correct: true },
                { content: 'what is my main source of income', correct: false },
                { content: 'if had I some loans', correct: false },
                { content: 'how did I usually pay of things', correct: false }
            ],
            answer: 'if had I some loans',
            topic: 'Reported Questions',
            level: 4
        }
    ]
};