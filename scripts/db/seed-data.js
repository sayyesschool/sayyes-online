export const assignment = {
    title: 'Assignment 1',
    content: 'Do your homework',
    status: 'assigned',
    dueDate: new Date('2025-01-01T10:00')
};

export const course = {
    _id: '5fb265487ef0653994e53a26',
    title : 'Course',
    description : '<p>Course description</p>',
    units : [
        {
            _id: '64b6c779368b0620f32984ed',
            title : 'Unit 1',
            description : '<p>Unit 1 description</p>',
            _lessons : [
                '64b6c782368b0620f32984f2'
            ]
        }
    ],
    lessons : [
        {
            _id: '64b6c782368b0620f32984f2',
            title : 'Lesson 1',
            description : '<p>Lesson 1 description</p>',
            _unit : '64b6c779368b0620f32984ed',
            _sections : [
                '64b6c8b8368b0620f3298514'
            ]
        }
    ],
    sections : [
        {
            _id : '64b6c8b8368b0620f3298514',
            title : 'After you watch',
            description : '<p>After you watch description</p>',
            _unit : '64b6c779368b0620f32984ed',
            _lesson : '64b6c782368b0620f32984f2',
            _exercises : [
                '660af90c20a265092f53b487'
            ]
        }
    ]
};

export const exercise = {
    _id: '660af90c20a265092f53b487',
    courseId : '5fb265487ef0653994e53a26',
    sectionId : '64b6c8b8368b0620f3298514',
    description : '<p class="directions">Complete the conversations. Use the conversations above to help you. Then practice with a partner. Use your own names.</p><p>Заполните пропуски, используя диалоги выше. Затем попрактикуйте данные диалоги с партнёром, используя свои собственные имена.</p>',
    items : [
        {
            _id : 'a43ffd3b-0624-4c67-9b75-f04e45ddc80a',
            type : 'fib',
            version : 1,
            props : {
                'content' : '<p class="overline"><strong>These people are friends:</strong></p><blockquote class="dialog"><p><i>A</i> Hi, Pat. How are you?</p><p><i>B</i> I\'m fine. How are you?</p><p><i>A</i> Good, {thanks}:{c6acc252}.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Good {morning}:{1531a523}, Anna.</p><p><i>B</i> Hi, Dan. {how}:{a3c657e4} are you?</p><p><i>A</i> I\'m {fine}:{2e061e31}, thanks.</p></blockquote><p></p><p class="overline"><strong>These people meet for the first time:</strong></p><blockquote class="dialog"><p><i>A</i> Hello. {i\'m}:{a64ac416} Chris Evans.</p><p><i>B</i> Hi. I\'m Grace Song.</p><p><i>A</i> {nice}:{8b698022} to meet you, Grace.</p></blockquote><hr><p></p><blockquote class="dialog"><p><i>A</i> Hello. I\'m Sarah.</p><p><i>B</i> Nice to meet {you}:{88f706f2}. I\'m Alan.</p><p><i>A</i> Nice to {meet}:{b5873c9e} you.</p></blockquote>',
                'required' : false
            }
        }
    ]
};

export const learner = {
    firstname: 'Ученик',
    email: 'learner@sayyes.school',
    password: '2406YiS2013',
    role: 'learner'
};

export const teacher = {
    firstname: 'Учитель',
    email: 'teacher@sayyes.school',
    password: '2406YiS2013',
    role: 'teacher'
};

export const lexemes = [
    {
        value: 'cat',
        definition: 'a small animal with fur, four legs, and a tail that is kept as a pet',
        translations: [
            'кошка',
            'кот'
        ],
        examples: [
            {
                text: 'My cat likes dozing in front of the fire.',
                translation: 'Моя кошка любит подремать у камина.'
            },
            {
                text: 'She\'s always chasing cats out of the garden to protect her precious birds.',
                translation: 'Она всегда выгоняет кошек из сада, чтобы защитить своих драгоценных птиц.'
            },
            {
                text: 'A cat was miaowing pitifully outside the door.',
                translation: 'За дверью жалобно мяукала кошка.'
            },
            {
                text: 'The cat purred as I stroked its fur.',
                translation: 'Кот замурлыкал, когда я погладил его по шерсти.'
            }
        ]
    },
    {
        value: 'dog',
        definition: 'a common animal with four legs, especially kept by people as a pet or to hunt or guard things',
        translations: [
            'собака',
            'пёс'
        ],
        examples: [
            {
                text: 'I grabbed the dog by the collar and dragged it out of the room.',
                translation: 'Я схватил пса за ошейник и выволок его из комнаты.'
            },
            {
                text: 'A dog lay under the table, gnawing on a bone.',
                translation: 'Под столом лежала собака и грызла кость.'
            },
            {
                text: 'Steve\'s gone out to walk the dogs.',
                translation: 'Стив пошел выгуливать собак.'
            },
            {
                text: 'The security guards set their dogs on the intruders.',
                translation: 'Охранники натравили на незваных гостей своих собак.'
            },
            {
                text: 'Please keep your dog on a lead when on the beach.',
                translation: 'Пожалуйста, держите свою собаку на поводке, когда вы находитесь на пляже.'
            }
        ]
    }
];

export const rooms = [
    { name: 'A', active: true },
    { name: 'B', active: true }
];