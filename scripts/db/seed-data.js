import moment from 'moment';
import { v4 as uuid } from 'uuid';

export const assignment = {
    title: 'Assignment 1',
    content: 'Do your homework',
    status: 'assigned',
    dueDate: new Date('2025-01-01T10:00')
};

export const course = {
    _id: '5fb265487ef0653994e53a26',
    title: 'Course',
    description: '<p>Course description</p>',
    units: [
        {
            _id: '64b6c779368b0620f32984ed',
            title: 'Unit 1',
            description: '<p>Unit 1 description</p>',
            _lessons: [
                '64b6c782368b0620f32984f2'
            ]
        }
    ],
    lessons: [
        {
            _id: '64b6c782368b0620f32984f2',
            title: 'Lesson 1',
            description: '<p>Lesson 1 description</p>',
            _unit: '64b6c779368b0620f32984ed',
            _sections: [
                '64b6c8b8368b0620f3298514'
            ]
        }
    ],
    sections: [
        {
            _id: '64b6c8b8368b0620f3298514',
            title: 'After you watch',
            description: '<p>After you watch description</p>',
            _unit: '64b6c779368b0620f32984ed',
            _lesson: '64b6c782368b0620f32984f2',
            _exercises: [
                '660af90c20a265092f53b487'
            ]
        }
    ]
};

export const exercise = {
    _id: '660af90c20a265092f53b487',
    courseId: '5fb265487ef0653994e53a26',
    sectionId: '64b6c8b8368b0620f3298514',
    description: '<p class="directions">Complete the conversations. Use the conversations above to help you. Then practice with a partner. Use your own names.</p><p>Заполните пропуски, используя диалоги выше. Затем попрактикуйте данные диалоги с партнёром, используя свои собственные имена.</p>',
    items: [
        {
            _id: 'a43ffd3b-0624-4c67-9b75-f04e45ddc80a',
            type: 'fib',
            version: 1,
            props: {
                'content': '<p class="overline"><strong>These people are friends:</strong></p><blockquote class="dialog"><p><i>A</i> Hi, Pat. How are you?</p><p><i>B</i> I\'m fine. How are you?</p><p><i>A</i> Good, {thanks}:{c6acc252}.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Good {morning}:{1531a523}, Anna.</p><p><i>B</i> Hi, Dan. {how}:{a3c657e4} are you?</p><p><i>A</i> I\'m {fine}:{2e061e31}, thanks.</p></blockquote><p></p><p class="overline"><strong>These people meet for the first time:</strong></p><blockquote class="dialog"><p><i>A</i> Hello. {i\'m}:{a64ac416} Chris Evans.</p><p><i>B</i> Hi. I\'m Grace Song.</p><p><i>A</i> {nice}:{8b698022} to meet you, Grace.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Hello. I\'m Sarah.</p><p><i>B</i> Nice to meet {you}:{88f706f2}. I\'m Alan.</p><p><i>A</i> Nice to {meet}:{b5873c9e} you.</p></blockquote>',
                'required': false
            }
        }
    ]
};

export const learner = {
    firstname: 'Ученик',
    email: 'learner@sayyes.school',
    password: '123456',
    role: 'learner',
    domains: ['club', 'lk', 'lms']
};

export const manager = {
    firstname: 'Менеджер',
    email: 'manager@sayyes.school',
    password: '123456',
    role: 'manager',
    domains: ['crm']
};

export const teacher = {
    firstname: 'Учитель',
    email: 'teacher@sayyes.school',
    password: '123456',
    role: 'teacher',
    domains: ['club', 'lk', 'lms']
};

export const editor = {
    firstname: 'Методист',
    email: 'editor@sayyes.school',
    password: '123456',
    role: 'editor',
    domains: ['cms', 'lk']
};

export const lexemes = [
    {
        value: 'cat',
        definition: 'a small animal with fur, four legs, and a tail that is kept as a pet',
        translation: 'кошка',
        examples: [
            {
                id: uuid(),
                text: 'My cat likes dozing in front of the fire.',
                translation: 'Моя кошка любит подремать у камина.'
            },
            {
                id: uuid(),
                text: 'She\'s always chasing cats out of the garden to protect her precious birds.',
                translation: 'Она всегда выгоняет кошек из сада, чтобы защитить своих драгоценных птиц.'
            },
            {
                id: uuid(),
                text: 'A cat was miaowing pitifully outside the door.',
                translation: 'За дверью жалобно мяукала кошка.'
            },
            {
                id: uuid(),
                text: 'The cat purred as I stroked its fur.',
                translation: 'Кот замурлыкал, когда я погладил его по шерсти.'
            }
        ],
        image: {
            src: 'https://picsum.photos/200'
        },
        publishStatus: 'approved'
    },
    {
        value: 'dog',
        definition: 'a common animal with four legs, especially kept by people as a pet or to hunt or guard things',
        translation: 'собака',
        examples: [
            {
                id: uuid(),
                text: 'I grabbed the dog by the collar and dragged it out of the room.',
                translation: 'Я схватил пса за ошейник и выволок его из комнаты.'
            },
            {
                id: uuid(),
                text: 'A dog lay under the table, gnawing on a bone.',
                translation: 'Под столом лежала собака и грызла кость.'
            },
            {
                id: uuid(),
                text: 'Steve\'s gone out to walk the dogs.',
                translation: 'Стив пошел выгуливать собак.'
            },
            {
                id: uuid(),
                text: 'The security guards set their dogs on the intruders.',
                translation: 'Охранники натравили на незваных гостей своих собак.'
            },
            {
                id: uuid(),
                text: 'Please keep your dog on a lead when on the beach.',
                translation: 'Пожалуйста, держите свою собаку на поводке, когда вы находитесь на пляже.'
            }
        ],
        image: {
            src: 'https://picsum.photos/200'
        },
        publishStatus: 'approved'
    },
    // {
    //     value: 'car',
    //     definition: 'a road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people',
    //     translation: 'автомобиль',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She drives a red sports car.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'tree',
    //     definition: 'a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground',
    //     translation: 'дерево',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'The children climbed the tree to pick apples.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'river',
    //     definition: 'a large natural stream of water flowing in a channel to the sea, a lake, or another such stream',
    //     translation: 'река',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They went fishing in the river.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'computer',
    //     definition: 'an electronic device for storing and processing data',
    //     translation: 'компьютер',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'I use my computer for work and entertainment.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'sun',
    //     definition: 'the star that is the central body of the solar system, around which the planets orbit and from which they receive light and heat',
    //     translation: 'солнце',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'The sun rises in the east and sets in the west.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'music',
    //     definition: 'vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion',
    //     translation: 'музыка',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'Listening to music helps me relax.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'flower',
    //     definition: 'the seed-bearing part of a plant, consisting of reproductive organs (stamens and carpels) that are typically surrounded by a brightly colored corolla (petals) and a green calyx (sepals)',
    //     translation: 'цветок',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She received a bouquet of flowers on her birthday.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'friend',
    //     definition: 'a person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations',
    //     translation: 'друг',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She\'s my best friend.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'beach',
    //     definition: 'a pebbly or sandy shore, especially by the ocean between high- and low-water marks',
    //     translation: 'пляж',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They enjoyed walking along the beach at sunset.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'language',
    //     definition: 'the method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way',
    //     translation: 'язык',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'Learning a new language opens doors to new opportunities.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'mountain',
    //     definition: 'a large natural elevation of the earth\'s surface rising abruptly from the surrounding level; a large steep hill',
    //     translation: 'гора',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They climbed the mountain to reach the summit.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'food',
    //     definition: 'any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth',
    //     translation: 'еда',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'We enjoyed delicious food at the restaurant.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'school',
    //     definition: 'an institution for educating children',
    //     translation: 'школа',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She teaches at a local elementary school.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'water',
    //     definition: 'a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms',
    //     translation: 'вода',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They drank refreshing cold water after the hike.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'friendship',
    //     definition: 'the emotions or conduct of friends; the state of being friends',
    //     translation: 'дружба',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'Their friendship grew stronger over the years.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'phone',
    //     definition: 'a device used for transmitting sound (typically speech) over distances',
    //     translation: 'телефон',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She answered the phone and spoke to her friend.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'money',
    //     definition: 'a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively',
    //     translation: 'деньги',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She saved up her money to buy a new bicycle.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'sky',
    //     definition: 'the region of the atmosphere and outer space seen from the earth',
    //     translation: 'небо',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'The sky was clear and blue.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'city',
    //     definition: 'a large town',
    //     translation: 'город',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'New York City is known as "The Big Apple".',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'country',
    //     definition: 'a nation with its own government, occupying a particular territory',
    //     translation: 'страна',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'She traveled to a foreign country for vacation.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'family',
    //     definition: 'a group consisting of parents and children living together in a household',
    //     translation: 'семья',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They have a large family with four children.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'game',
    //     definition: 'a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck',
    //     translation: 'игра',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'We played a board game together.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'movie',
    //     definition: 'a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture',
    //     translation: 'фильм',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'They watched a great movie last night.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // },
    // {
    //     value: 'sport',
    //     definition: 'an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment',
    //     translation: 'спорт',
    //     examples: [
    //         {
    //             id: uuid(),
    //             text: 'He plays soccer and tennis as his favorite sports.',
    //             translation: ''
    //         }
    //     ],
    //     publishStatus: 'approved'
    // }
];

export const builtInVocabulary = {
    title: 'Животные'
};

export const customVocabulary = {
    title: 'Созданный словарь'
};

export const rooms = [
    { name: 'A', active: true },
    { name: 'B', active: true }
];

export const meetings = [
    {
        title: 'Online Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: moment().add(1, 'day').toDate(),
        duration: 60,
        level: 0,
        capacity: 10,
        published: true,
        online: true,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    },
    {
        title: 'Offline Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: moment().add(2, 'day').toDate(),
        duration: 60,
        level: 1,
        capacity: 10,
        published: true,
        online: false,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    },
    {
        title: 'Free Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'scheduled',
        date: moment().add(3, 'day').toDate(),
        duration: 60,
        level: 1,
        capacity: 10,
        free: true,
        published: true,
        online: true,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    },
    {
        title: 'Started Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'started',
        date: moment().subtract(1, 'hour').toDate(),
        duration: 60,
        level: 1,
        capacity: 10,
        published: true,
        online: false,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    },
    {
        title: 'Past Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'ended',
        date: moment().subtract(1, 'day').toDate(),
        duration: 60,
        level: 1,
        capacity: 10,
        published: true,
        online: false,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    },
    {
        title: 'Canceled Meeting',
        description: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui magnam, veniam voluptatibus alias cumque libero quia ab. Odio quis quaerat cupiditate consequatur totam? Tempora ab iste commodi laboriosam, saepe officiis.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quo distinctio! Natus vel voluptas nemo eum consectetur officiis, sit laboriosam sapiente delectus nihil illum est quaerat corporis commodi quo debitis!</p>',
        status: 'canceled',
        date: moment().add(5, 'day').toDate(),
        duration: 60,
        level: 1,
        capacity: 10,
        published: true,
        online: false,
        image: {
            src: 'https://picsum.photos/400'
        },
        materialsUrl: 'https://zoom.us/materials',
        notes: 'Meeting notes',
        hostId: null
    }
];

export const payments = [
    {
        uuid: uuid(),
        amount: 590,
        currency: 'RUB',
        status: 'succeeded',
        paid: true,
        refundable: false,
        refunded: false,
        test: true,
        operator: 'yookassa',
        description: 'Payment description',
        paidAt: moment().toDate(),
        userId: null
    }
];

export const memberships = [
    {
        limit: 1,
        price: 590,
        expiresAt: moment().add(2, 'weeks').toDate(),
        purchasedAt: moment().toDate(),
        userId: null,
        paymentId: null,
        registrationIds: []
    },
    {
        limit: 4,
        price: 2990,
        expiresAt: moment().add(1, 'month').toDate(),
        purchasedAt: moment().toDate(),
        userId: null,
        paymentId: null,
        registrationIds: []
    }
];