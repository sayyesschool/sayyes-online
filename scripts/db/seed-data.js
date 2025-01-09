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
    domains: ['club', 'lk', 'lms'],
    active: true
};

export const manager = {
    firstname: 'Менеджер',
    email: 'manager@sayyes.school',
    password: '123456',
    role: 'manager',
    domains: ['crm'],
    permissions: ['all'],
    active: true
};

export const teacher = {
    firstname: 'Учитель',
    email: 'teacher@sayyes.school',
    password: '123456',
    role: 'teacher',
    domains: ['club', 'lk', 'lms'],
    active: true
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
        approved: true
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
        approved: true
    },
    {
        value: 'car',
        definition: 'a road vehicle, typically with four wheels, powered by an internal combustion engine and able to carry a small number of people',
        translation: 'автомобиль',
        examples: [
            {
                id: uuid(),
                text: 'She drives a red sports car.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'tree',
        definition: 'a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground',
        translation: 'дерево',
        examples: [
            {
                id: uuid(),
                text: 'The children climbed the tree to pick apples.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'river',
        definition: 'a large natural stream of water flowing in a channel to the sea, a lake, or another such stream',
        translation: 'река',
        examples: [
            {
                id: uuid(),
                text: 'They went fishing in the river.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'computer',
        definition: 'an electronic device for storing and processing data',
        translation: 'компьютер',
        examples: [
            {
                id: uuid(),
                text: 'I use my computer for work and entertainment.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'sun',
        definition: 'the star that is the central body of the solar system, around which the planets orbit and from which they receive light and heat',
        translation: 'солнце',
        examples: [
            {
                id: uuid(),
                text: 'The sun rises in the east and sets in the west.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'music',
        definition: 'vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion',
        translation: 'музыка',
        examples: [
            {
                id: uuid(),
                text: 'Listening to music helps me relax.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'flower',
        definition: 'the seed-bearing part of a plant, consisting of reproductive organs (stamens and carpels) that are typically surrounded by a brightly colored corolla (petals) and a green calyx (sepals)',
        translation: 'цветок',
        examples: [
            {
                id: uuid(),
                text: 'She received a bouquet of flowers on her birthday.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'friend',
        definition: 'a person with whom one has a bond of mutual affection, typically one exclusive of sexual or family relations',
        translation: 'друг',
        examples: [
            {
                id: uuid(),
                text: 'She\'s my best friend.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'beach',
        definition: 'a pebbly or sandy shore, especially by the ocean between high- and low-water marks',
        translation: 'пляж',
        examples: [
            {
                id: uuid(),
                text: 'They enjoyed walking along the beach at sunset.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'language',
        definition: 'the method of human communication, either spoken or written, consisting of the use of words in a structured and conventional way',
        translation: 'язык',
        examples: [
            {
                id: uuid(),
                text: 'Learning a new language opens doors to new opportunities.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'mountain',
        definition: 'a large natural elevation of the earth\'s surface rising abruptly from the surrounding level; a large steep hill',
        translation: 'гора',
        examples: [
            {
                id: uuid(),
                text: 'They climbed the mountain to reach the summit.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'food',
        definition: 'any nutritious substance that people or animals eat or drink or that plants absorb in order to maintain life and growth',
        translation: 'еда',
        examples: [
            {
                id: uuid(),
                text: 'We enjoyed delicious food at the restaurant.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'school',
        definition: 'an institution for educating children',
        translation: 'школа',
        examples: [
            {
                id: uuid(),
                text: 'She teaches at a local elementary school.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'water',
        definition: 'a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms',
        translation: 'вода',
        examples: [
            {
                id: uuid(),
                text: 'They drank refreshing cold water after the hike.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'friendship',
        definition: 'the emotions or conduct of friends; the state of being friends',
        translation: 'дружба',
        examples: [
            {
                id: uuid(),
                text: 'Their friendship grew stronger over the years.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'phone',
        definition: 'a device used for transmitting sound (typically speech) over distances',
        translation: 'телефон',
        examples: [
            {
                id: uuid(),
                text: 'She answered the phone and spoke to her friend.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'money',
        definition: 'a current medium of exchange in the form of coins and banknotes; coins and banknotes collectively',
        translation: 'деньги',
        examples: [
            {
                id: uuid(),
                text: 'She saved up her money to buy a new bicycle.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'sky',
        definition: 'the region of the atmosphere and outer space seen from the earth',
        translation: 'небо',
        examples: [
            {
                id: uuid(),
                text: 'The sky was clear and blue.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'city',
        definition: 'a large town',
        translation: 'город',
        examples: [
            {
                id: uuid(),
                text: 'New York City is known as "The Big Apple".',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'country',
        definition: 'a nation with its own government, occupying a particular territory',
        translation: 'страна',
        examples: [
            {
                id: uuid(),
                text: 'She traveled to a foreign country for vacation.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'family',
        definition: 'a group consisting of parents and children living together in a household',
        translation: 'семья',
        examples: [
            {
                id: uuid(),
                text: 'They have a large family with four children.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'game',
        definition: 'a form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck',
        translation: 'игра',
        examples: [
            {
                id: uuid(),
                text: 'We played a board game together.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'movie',
        definition: 'a story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture',
        translation: 'фильм',
        examples: [
            {
                id: uuid(),
                text: 'They watched a great movie last night.',
                translation: ''
            }
        ],
        approved: true
    },
    {
        value: 'sport',
        definition: 'an activity involving physical exertion and skill in which an individual or team competes against another or others for entertainment',
        translation: 'спорт',
        examples: [
            {
                id: uuid(),
                text: 'He plays soccer and tennis as his favorite sports.',
                translation: ''
            }
        ],
        approved: true
    }
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
        userId: null,
        method : {
            id : '26166499-000f-5000-9000-18aebc48e592',
            type : 'bank_card',
            saved : false,
            card : {
                type : 'Visa',
                last4 : '2525',
                month : 12,
                year : 2020,
                country : 'RU',
                issuer : 'Sberbank Of Russia'
            }
        }
    }
];

export const requests = [
    {
        status: 'new',
        description: 'Прохождение теста на сайте',
        contact: {
            name: 'Oleg',
            email: 'olegpolyakov@outlook.com'
        },
        channel: 'test',
        source: '',
        data: {},
        note: ''
    }
];

export const memberships = [
    {
        limit: 1,
        price: 590,
        startDate: moment().toDate(),
        endDate: moment().add(2, 'weeks').toDate(),
        userId: null,
        paymentId: null,
        registrationIds: []
    },
    {
        limit: 4,
        price: 2990,
        startDate: moment().toDate(),
        endDate: moment().add(1, 'month').toDate(),
        userId: null,
        paymentId: null,
        registrationIds: []
    }
];

export const data = [
    {
        'key' : 'test',
        'value' : {
            'utm' : {
                'source' : 'tg_adv_10.01.25',
                'medium' : 'email'
            },
            'questions' : [
                {
                    'id' : 1,
                    'content' : '<p>- Are you on vacation?</p><p>- <span class="blank"></span></p>',
                    'options' : [
                        {
                            'content' : 'Yes, I be.',
                            'correct' : false
                        },
                        {
                            'content' : 'Yes, I do.',
                            'correct' : false
                        },
                        {
                            'content' : 'Yes, I is.',
                            'correct' : false
                        },
                        {
                            'content' : 'Yes I am.',
                            'correct' : true
                        }
                    ],
                    'topic' : 'To be',
                    'level' : 1
                },
                {
                    'id' : 2,
                    'content' : '<p>I <span class="blank"></span> up early every morning.</p>',
                    'options' : [
                        {
                            'content' : 'get',
                            'correct' : true
                        },
                        {
                            'content' : 'gets',
                            'correct' : false
                        },
                        {
                            'content' : 'am getting',
                            'correct' : false
                        },
                        {
                            'content' : 'get',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Present Simple',
                    'level' : 1
                },
                {
                    'id' : 3,
                    'content' : '<p>What time <span class="blank"></span> go to work?</p>',
                    'options' : [
                        {
                            'content' : 'do they',
                            'correct' : false
                        },
                        {
                            'content' : 'do she',
                            'correct' : false
                        },
                        {
                            'content' : 'is he',
                            'correct' : false
                        },
                        {
                            'content' : 'does he',
                            'correct' : true
                        }
                    ],
                    'topic' : 'Present Simple',
                    'level' : 1
                },
                {
                    'id' : 4,
                    'content' : '<p><span class="blank"></span> a park near my house.</p>',
                    'options' : [
                        {
                            'content' : 'It is',
                            'correct' : false
                        },
                        {
                            'content' : 'There is',
                            'correct' : true
                        },
                        {
                            'content' : 'They are',
                            'correct' : false
                        },
                        {
                            'content' : 'There are',
                            'correct' : false
                        }
                    ],
                    'topic' : 'There is/are',
                    'level' : 1
                },
                {
                    'id' : 5,
                    'content' : '<p>Did you have a favorite toy when you <span class="blank"></span> a kid?</p>',
                    'options' : [
                        {
                            'content' : 'was',
                            'correct' : false
                        },
                        {
                            'content' : 'are',
                            'correct' : false
                        },
                        {
                            'content' : 'be',
                            'correct' : false
                        },
                        {
                            'content' : 'were',
                            'correct' : true
                        }
                    ],
                    'topic' : 'To be',
                    'level' : 1
                },
                {
                    'id' : 6,
                    'content' : '<p>- What\'s the weather forecast for tomorrow?<br>- It <span class="blank"></span> tomorrow again.</p>',
                    'options' : [
                        {
                            'content' : 'rains',
                            'correct' : false
                        },
                        {
                            'content' : 'is raining',
                            'correct' : false
                        },
                        {
                            'content' : 'is going to rain',
                            'correct' : true
                        },
                        {
                            'content' : 'rained',
                            'correct' : false
                        }
                    ],
                    'topic' : 'To be going to',
                    'level' : 2
                },
                {
                    'id' : 7,
                    'content' : '<p>- What <span class="blank"></span> when you broke your arm?<br>- I was climbing a tree.</p>',
                    'options' : [
                        {
                            'content' : 'are you doing',
                            'correct' : false
                        },
                        {
                            'content' : 'did you do',
                            'correct' : false
                        },
                        {
                            'content' : 'were you doing',
                            'correct' : true
                        },
                        {
                            'content' : 'do you do',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Past Continuous',
                    'level' : 2
                },
                {
                    'id' : 8,
                    'content' : '<p>I <span class="blank"></span> be at the hotel after 8p.m.</p>',
                    'options' : [
                        {
                            'content' : 'maybe',
                            'correct' : false
                        },
                        {
                            'content' : 'will be',
                            'correct' : false
                        },
                        {
                            'content' : 'might',
                            'correct' : true
                        },
                        {
                            'content' : 'might to',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Might',
                    'level' : 2
                },
                {
                    'id' : 9,
                    'content' : '<p>If Rebecca <span class="blank"></span> go to college, her parents will be disappointed.</p>',
                    'options' : [
                        {
                            'content' : 'won\'t',
                            'correct' : false
                        },
                        {
                            'content' : 'don\'t',
                            'correct' : false
                        },
                        {
                            'content' : 'doesn\'t',
                            'correct' : true
                        },
                        {
                            'content' : 'will',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Conditional sentences',
                    'level' : 2
                },
                {
                    'id' : 10,
                    'content' : '<p>- I\'m not a good tennis player.<br>- <span class="blank"></span></p>',
                    'options' : [
                        {
                            'content' : 'I\'m not too.',
                            'correct' : false
                        },
                        {
                            'content' : 'I\'m not either.',
                            'correct' : true
                        },
                        {
                            'content' : 'I don\'t too.',
                            'correct' : false
                        },
                        {
                            'content' : 'I don\'t neither.',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Too/Either',
                    'level' : 2
                },
                {
                    'id' : 11,
                    'content' : '<p>I <span class="blank"></span> over to my sister\'s house a lot.</p>',
                    'options' : [
                        {
                            'content' : 'was used to go',
                            'correct' : false
                        },
                        {
                            'content' : 'used to go',
                            'correct' : true
                        },
                        {
                            'content' : 'would to go',
                            'correct' : false
                        },
                        {
                            'content' : 'used to going',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Used to',
                    'level' : 3
                },
                {
                    'id' : 12,
                    'content' : '<p>When I was a kid, my parents always made me <span class="blank"></span> my homework.</p>',
                    'options' : [
                        {
                            'content' : 'to do',
                            'correct' : false
                        },
                        {
                            'content' : 'doing',
                            'correct' : false
                        },
                        {
                            'content' : 'do',
                            'correct' : true
                        },
                        {
                            'content' : 'did',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Infinitives',
                    'level' : 3
                },
                {
                    'id' : 13,
                    'content' : '<p>I wish I <span class="blank"></span> something more exciting with my life.</p>',
                    'options' : [
                        {
                            'content' : 'do',
                            'correct' : false
                        },
                        {
                            'content' : 'can do',
                            'correct' : false
                        },
                        {
                            'content' : 'will do',
                            'correct' : false
                        },
                        {
                            'content' : 'could do',
                            'correct' : true
                        }
                    ],
                    'topic' : 'I wish',
                    'level' : 3
                },
                {
                    'id' : 14,
                    'content' : '<p>Anna <span class="blank"></span> an art class since September, and she loves it.</p>',
                    'options' : [
                        {
                            'content' : 'is taking',
                            'correct' : false
                        },
                        {
                            'content' : 'has taken',
                            'correct' : false
                        },
                        {
                            'content' : 'took',
                            'correct' : false
                        },
                        {
                            'content' : 'has been taking',
                            'correct' : true
                        }
                    ],
                    'topic' : 'Present Perfect Continuous',
                    'level' : 3
                },
                {
                    'id' : 15,
                    'content' : '<p>Several flights <span class="blank"></span> earlier today because of severe thunderstorms.</p>',
                    'options' : [
                        {
                            'content' : 'was delayed',
                            'correct' : false
                        },
                        {
                            'content' : 'delayed',
                            'correct' : false
                        },
                        {
                            'content' : 'were delayed',
                            'correct' : true
                        },
                        {
                            'content' : 'be delayed',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Passive Voice',
                    'level' : 3
                },
                {
                    'id' : 16,
                    'content' : '<p>We <span class="blank"></span> to a soccer game last night, but the weather was awful, so we stayed home.</p>',
                    'options' : [
                        {
                            'content' : 'are supposed to go',
                            'correct' : false
                        },
                        {
                            'content' : 'are going to go',
                            'correct' : false
                        },
                        {
                            'content' : 'went',
                            'correct' : false
                        },
                        {
                            'content' : 'were supposed to go',
                            'correct' : true
                        }
                    ],
                    'topic' : 'Be supposed to',
                    'level' : 4
                },
                {
                    'id' : 17,
                    'content' : '<p>Last week I ran into an old friend of mine whom I <span class="blank"></span> in a long time.</p>',
                    'options' : [
                        {
                            'content' : 'haven\'t seen',
                            'correct' : false
                        },
                        {
                            'content' : 'didn\'t see',
                            'correct' : false
                        },
                        {
                            'content' : 'wasn\'t seeing',
                            'correct' : false
                        },
                        {
                            'content' : 'hadn\'t seen',
                            'correct' : true
                        }
                    ],
                    'topic' : 'Past Perfect',
                    'level' : 4
                },
                {
                    'id' : 18,
                    'content' : '<p>We\'d love to get our neighbors <span class="blank"></span> their yard. It\'s really a mess!</p>',
                    'options' : [
                        {
                            'content' : 'cleaned up',
                            'correct' : false
                        },
                        {
                            'content' : 'will clean up',
                            'correct' : false
                        },
                        {
                            'content' : 'to clean up',
                            'correct' : true
                        },
                        {
                            'content' : 'clean up',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Infinitive',
                    'level' : 4
                },
                {
                    'id' : 19,
                    'content' : '<p>If Dennis had been in the right place at the right time, his career <span class="blank"></span>.</p>',
                    'options' : [
                        {
                            'content' : 'would take off',
                            'correct' : false
                        },
                        {
                            'content' : 'is taking off',
                            'correct' : false
                        },
                        {
                            'content' : 'has taken off',
                            'correct' : false
                        },
                        {
                            'content' : 'would have taken off',
                            'correct' : true
                        }
                    ],
                    'topic' : 'Conditional Sentences',
                    'level' : 4
                },
                {
                    'id' : 20,
                    'content' : '<p>She asked me <span class="blank"></span>.</p>',
                    'options' : [
                        {
                            'content' : 'whether I could stick to a monthly budget',
                            'correct' : true
                        },
                        {
                            'content' : 'what is my main source of income',
                            'correct' : false
                        },
                        {
                            'content' : 'if had I some loans',
                            'correct' : false
                        },
                        {
                            'content' : 'how did I usually pay of things',
                            'correct' : false
                        }
                    ],
                    'topic' : 'Reported Questions',
                    'level' : 4
                }
            ]
        }
    },
    {
        'key' : 'club.packs',
        'value' : [
            {
                'id' : '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
                'duration' : [
                    2,
                    'week'
                ],
                'price' : 590,
                'priceWithoutDiscount' : 590,
                'visits' : 1
            },
            {
                'id' : '3f7eb11c-12c5-4631-af4a-39855ca17810',
                'duration' : [
                    1,
                    'month'
                ],
                'price' : 1990,
                'priceWithoutDiscount' : 2990,
                'visits' : 4
            },
            {
                'id' : '3d678c9b-632d-492a-aaad-e1ced4f35255',
                'duration' : [
                    3,
                    'month'
                ],
                'price' : 3990,
                'priceWithoutDiscount' : 5990,
                'visits' : 8
            },
            {
                'id' : '8012db3e-b720-48ea-95a9-ba42772da33d',
                'duration' : [
                    6,
                    'month'
                ],
                'price' : 6990,
                'priceWithoutDiscount' : 9990,
                'visits' : 16
            }
        ]
    }
];