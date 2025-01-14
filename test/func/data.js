import datetime from 'shared/libs/datetime';

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

export const REQUEST = {
    status: 'new',
    type: 'call',
    description: 'Тест',
    contact: {
        name: 'Тест',
        email: 'olegpolyakov@outlook.com',
        phone: '79999999999'
    },
    channel: 'call',
    source: 'google',
    utm: {
        source: 'google',
        medium: 'cpc',
        campaign: 'brand',
        term: 'test',
        content: 'test'
    }
};

export const REQUESTS = [
    REQUEST,
    {
        status: 'processing',
        type: 'call',
        description: 'Тест',
        contact: { name: 'Тест', email: 'test@sayyes.school', phone: '79999999999' },
        channel: 'call',
        source: 'google',
        utm: {
            source: 'google',
            medium: 'cpc',
            campaign: 'brand',
            term: 'test',
            content: 'test'
        }
    },
    {
        status: 'completed',
        type: 'call',
        description: 'Тест',
        contact: { name: 'Тест', email: 'test@sayyes.school', phone: '79999999999' },
        channel: 'call',
        source: 'google',
        utm: {
            source: 'google',
            medium: 'cpc',
            campaign: 'brand',
            term: 'test',
            content: 'test'
        }
    }
];

export const DEFAULT_MEMBERSHIP = {
    limit: 1,
    endDate: datetime().add(2, 'week').toDate()
};

export const EXPIRED_MEMBERSHIP = {
    limit: 1,
    endDate: datetime().subtract(2, 'week').toDate()
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

export const TEST = {
    questions: [
        {
            'id': 1,
            'content': '<p>I <span class="blank"></span> to school every day.</p>',
            'options': [
                { 'content': 'go', 'correct': true },
                { 'content': 'goes', 'correct': false },
                { 'content': 'going', 'correct': false },
                { 'content': 'gone', 'correct': false }
            ],
            'topic': 'Present Simple',
            'level': 1
        },
        {
            'id': 2,
            'content': '<p>She <span class="blank"></span> a book right now.</p>',
            'options': [
                { 'content': 'is reading', 'correct': true },
                { 'content': 'reads', 'correct': false },
                { 'content': 'read', 'correct': false },
                { 'content': 'reading', 'correct': false }
            ],
            'topic': 'Present Continuous',
            'level': 1
        },
        {
            'id': 3,
            'content': '<p>They <span class="blank"></span> home at 7 PM every evening.</p>',
            'options': [
                { 'content': 'arrive', 'correct': true },
                { 'content': 'arrives', 'correct': false },
                { 'content': 'arriving', 'correct': false },
                { 'content': 'arrived', 'correct': false }
            ],
            'topic': 'Present Simple',
            'level': 1
        },
        {
            'id': 4,
            'content': '<p>He <span class="blank"></span> TV when I called him.</p>',
            'options': [
                { 'content': 'was watching', 'correct': true },
                { 'content': 'watched', 'correct': false },
                { 'content': 'watching', 'correct': false },
                { 'content': 'watches', 'correct': false }
            ],
            'topic': 'Past Continuous',
            'level': 1
        },
        {
            'id': 5,
            'content': '<p>We <span class="blank"></span> any homework yesterday.</p>',
            'options': [
                { 'content': 'didn’t have', 'correct': true },
                { 'content': 'don’t have', 'correct': false },
                { 'content': 'haven’t had', 'correct': false },
                { 'content': 'doesn\'t have', 'correct': false }
            ],
            'topic': 'Past Simple',
            'level': 1
        },

        {
            'id': 6,
            'content': '<p>I <span class="blank"></span> to the party if I finish my work.</p>',
            'options': [
                { 'content': 'will go', 'correct': true },
                { 'content': 'go', 'correct': false },
                { 'content': 'going', 'correct': false },
                { 'content': 'went', 'correct': false }
            ],
            'topic': 'Future Simple',
            'level': 2
        },
        {
            'id': 7,
            'content': '<p>He <span class="blank"></span> playing football when I saw him.</p>',
            'options': [
                { 'content': 'was', 'correct': true },
                { 'content': 'is', 'correct': false },
                { 'content': 'were', 'correct': false },
                { 'content': 'am', 'correct': false }
            ],
            'topic': 'Past Continuous',
            'level': 2
        },
        {
            'id': 8,
            'content': '<p>She <span class="blank"></span> in the park every morning.</p>',
            'options': [
                { 'content': 'runs', 'correct': true },
                { 'content': 'run', 'correct': false },
                { 'content': 'running', 'correct': false },
                { 'content': 'runned', 'correct': false }
            ],
            'topic': 'Present Simple',
            'level': 2
        },
        {
            'id': 9,
            'content': '<p>We <span class="blank"></span> at the cinema at 8 PM tomorrow.</p>',
            'options': [
                { 'content': 'are meeting', 'correct': true },
                { 'content': 'meet', 'correct': false },
                { 'content': 'will meet', 'correct': false },
                { 'content': 'met', 'correct': false }
            ],
            'topic': 'Future Continuous',
            'level': 2
        },
        {
            'id': 10,
            'content': '<p>If it rains, we <span class="blank"></span> stay inside.</p>',
            'options': [
                { 'content': 'will', 'correct': true },
                { 'content': 'would', 'correct': false },
                { 'content': 'are', 'correct': false },
                { 'content': 'were', 'correct': false }
            ],
            'topic': 'First Conditional',
            'level': 2
        },

        {
            'id': 11,
            'content': '<p>By the time we arrived, she <span class="blank"></span> home.</p>',
            'options': [
                { 'content': 'had left', 'correct': true },
                { 'content': 'has left', 'correct': false },
                { 'content': 'left', 'correct': false },
                { 'content': 'was leaving', 'correct': false }
            ],
            'topic': 'Past Perfect',
            'level': 3
        },
        {
            'id': 12,
            'content': '<p>We <span class="blank"></span> here for 10 years.</p>',
            'options': [
                { 'content': 'have lived', 'correct': true },
                { 'content': 'live', 'correct': false },
                { 'content': 'living', 'correct': false },
                { 'content': 'been living', 'correct': false }
            ],
            'topic': 'Present Perfect',
            'level': 3
        },
        {
            'id': 13,
            'content': '<p>She <span class="blank"></span> the answer, but she didn’t tell me.</p>',
            'options': [
                { 'content': 'knew', 'correct': true },
                { 'content': 'know', 'correct': false },
                { 'content': 'knows', 'correct': false },
                { 'content': 'knowing', 'correct': false }
            ],
            'topic': 'Past Simple',
            'level': 3
        },
        {
            'id': 14,
            'content': '<p>We <span class="blank"></span> the movie by the time you arrived.</p>',
            'options': [
                { 'content': 'had watched', 'correct': true },
                { 'content': 'watched', 'correct': false },
                { 'content': 'watch', 'correct': false },
                { 'content': 'have watched', 'correct': false }
            ],
            'topic': 'Past Perfect',
            'level': 3
        },
        {
            'id': 15,
            'content': '<p>If I <span class="blank"></span> more time, I would travel the world.</p>',
            'options': [
                { 'content': 'had', 'correct': true },
                { 'content': 'have', 'correct': false },
                { 'content': 'will have', 'correct': false },
                { 'content': 'would have', 'correct': false }
            ],
            'topic': 'Third Conditional',
            'level': 3
        },

        {
            'id': 16,
            'content': '<p>It’s essential that he <span class="blank"></span> the report by tomorrow.</p>',
            'options': [
                { 'content': 'finish', 'correct': true },
                { 'content': 'finishes', 'correct': false },
                { 'content': 'finished', 'correct': false },
                { 'content': 'will finish', 'correct': false }
            ],
            'topic': 'Subjunctive',
            'level': 4
        },
        {
            'id': 17,
            'content': '<p>By this time next week, we <span class="blank"></span> flying to Paris.</p>',
            'options': [
                { 'content': 'will be', 'correct': true },
                { 'content': 'are', 'correct': false },
                { 'content': 'will have been', 'correct': false },
                { 'content': 'have been', 'correct': false }
            ],
            'topic': 'Future Perfect Continuous',
            'level': 4
        },
        {
            'id': 18,
            'content': '<p>He <span class="blank"></span> me for hours when I finally agreed to help him.</p>',
            'options': [
                { 'content': 'had been bothering', 'correct': true },
                { 'content': 'was bothering', 'correct': false },
                { 'content': 'bothered', 'correct': false },
                { 'content': 'is bothering', 'correct': false }
            ],
            'topic': 'Past Perfect Continuous',
            'level': 4
        },
        {
            'id': 19,
            'content': '<p>Neither she <span class="blank"></span> he wanted to go.</p>',
            'options': [
                { 'content': 'nor', 'correct': true },
                { 'content': 'or', 'correct': false },
                { 'content': 'and', 'correct': false },
                { 'content': 'but', 'correct': false }
            ],
            'topic': 'Conjunctions',
            'level': 4
        },
        {
            'id': 20,
            'content': '<p>If he <span class="blank"></span> earlier, he would have caught the train.</p>',
            'options': [
                { 'content': 'had left', 'correct': true },
                { 'content': 'left', 'correct': false },
                { 'content': 'leaves', 'correct': false },
                { 'content': 'was leaving', 'correct': false }
            ],
            'topic': 'Third Conditional',
            'level': 4
        },

        {
            'id': 21,
            'content': '<p>She <span class="blank"></span> able to speak three languages fluently.</p>',
            'options': [
                { 'content': 'is', 'correct': true },
                { 'content': 'has', 'correct': false },
                { 'content': 'can', 'correct': false },
                { 'content': 'could', 'correct': false }
            ],
            'topic': 'Modals of Ability',
            'level': 5
        },
        {
            'id': 22,
            'content': '<p>It <span class="blank"></span> be raining outside. I hear thunder.</p>',
            'options': [
                { 'content': 'must', 'correct': true },
                { 'content': 'could', 'correct': false },
                { 'content': 'might', 'correct': false },
                { 'content': 'should', 'correct': false }
            ],
            'topic': 'Modals of Deduction',
            'level': 5
        },
        {
            'id': 23,
            'content': '<p>He <span class="blank"></span> finished the report by tomorrow.</p>',
            'options': [
                { 'content': 'should have', 'correct': true },
                { 'content': 'must have', 'correct': false },
                { 'content': 'could have', 'correct': false },
                { 'content': 'might have', 'correct': false }
            ],
            'topic': 'Modals of Past Deduction',
            'level': 5
        },
        {
            'id': 24,
            'content': '<p>The book was so interesting that I <span class="blank"></span> put it down.</p>',
            'options': [
                { 'content': 'couldn’t', 'correct': true },
                { 'content': 'didn’t', 'correct': false },
                { 'content': 'wasn’t', 'correct': false },
                { 'content': 'wouldn’t', 'correct': false }
            ],
            'topic': 'Past Modals',
            'level': 5
        },
        {
            'id': 25,
            'content': '<p>She <span class="blank"></span> told me the truth all along.</p>',
            'options': [
                { 'content': 'must have', 'correct': true },
                { 'content': 'might have', 'correct': false },
                { 'content': 'should have', 'correct': false },
                { 'content': 'could have', 'correct': false }
            ],
            'topic': 'Modals of Deduction',
            'level': 5
        },
        {
            'id': 26,
            'content': '<p>Considering the team\'s current progress, it is <span class="blank"></span> that they will finish the project on time.</p>',
            'options': [
                { 'content': 'unlikely', 'correct': true },
                { 'content': 'likely', 'correct': false },
                { 'content': 'certain', 'correct': false },
                { 'content': 'possible', 'correct': false }
            ],
            'topic': 'Adjectives',
            'level': 6
        },
        {
            'id': 27,
            'content': '<p>She is a <span class="blank"></span> writer, known for her captivating stories.</p>',
            'options': [
                { 'content': 'talented', 'correct': true },
                { 'content': 'relentless', 'correct': false },
                { 'content': 'clumsy', 'correct': false },
                { 'content': 'unskilled', 'correct': false }
            ],
            'topic': 'Adjectives',
            'level': 6
        },
        {
            'id': 28,
            'content': '<p>He spoke <span class="blank"></span> during the meeting, making everyone understand the issue clearly.</p>',
            'options': [
                { 'content': 'eloquently', 'correct': true },
                { 'content': 'awkwardly', 'correct': false },
                { 'content': 'rudely', 'correct': false },
                { 'content': 'mumbling', 'correct': false }
            ],
            'topic': 'Adverbs',
            'level': 6
        },
        {
            'id': 29,
            'content': '<p>The decision was <span class="blank"></span> upon after a long debate, and all members agreed on it.</p>',
            'options': [
                { 'content': 'reached', 'correct': true },
                { 'content': 'ignored', 'correct': false },
                { 'content': 'avoided', 'correct': false },
                { 'content': 'postponed', 'correct': false }
            ],
            'topic': 'Phrasal Verbs',
            'level': 6
        },
        {
            'id': 30,
            'content': '<p>He is a <span class="blank"></span> speaker who knows how to persuade his audience with compelling arguments.</p>',
            'options': [
                { 'content': 'persuasive', 'correct': true },
                { 'content': 'boring', 'correct': false },
                { 'content': 'uninspiring', 'correct': false },
                { 'content': 'intimidating', 'correct': false }
            ],
            'topic': 'Adjectives',
            'level': 6
        }
    ]
};

export const TEST_RESULTS = {
    name: 'Test',
    email: 'olegpolyakov@outlook.com',
    goal: 'test',
    utm: {
        source: 'newsletter',
        medium: 'email',
        campaign: 'summer_sale',
        term: 'shoes',
        content: 'button'
    },
    answers: [
        'goes',
        'is reading',
        'arrive',
        'was watching',
        'didn’t have',
        'will go',
        'was',
        'runs',
        'are meeting',
        'will',
        'had left',
        'have lived',
        'knew',
        'had watched',
        'had',
        'should have',
        'nor',
        'had left',
        'is',
        'must',
        'should have',
        'must have',
        'couldn’t',
        'unlikely',
        'talented',
        'must',
        'should have',
        'persuasive'
    ]
};