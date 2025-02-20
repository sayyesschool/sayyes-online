import { Types } from 'mongoose';
import { v4 as uuid } from 'uuid';

export default [
    {
        _id: new Types.ObjectId().toHexString(),
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
        _id: new Types.ObjectId().toHexString(),
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
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    },
    {
        _id: new Types.ObjectId().toHexString(),
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
        publishStatus: 'approved'
    }
];