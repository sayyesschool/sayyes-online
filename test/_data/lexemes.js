import { v4 as uuid } from 'uuid';

import { LEARNER, MANAGER } from './user';

export const LEXEMES = [
    { value: 'dog', translation: 'собака', publishStatus: 'pending' },
    { value: 'cat', translation: 'киса', publishStatus: 'archived' },
    { value: 'cat', translation: 'кошка', publishStatus: 'approved' },
    { value: 'cat', translation: 'кот', publishStatus: 'approved' },
    { value: 'cat', translation: 'котёнок', publishStatus: 'approved' },
    { value: 'cat', translation: 'кисуля', publishStatus: 'pending' },
    { value: 'act', translation: 'действовать', publishStatus: 'approved' },
    { value: 'action', translation: 'действие', publishStatus: 'pending' },
    { value: 'active', translation: 'активный', publishStatus: 'approved' },
    { value: 'actually', translation: 'на самом деле', publishStatus: 'approved' },
    { value: 'actor', translation: 'актёр', publishStatus: 'approved' },
    { value: 'writing', translation: 'писать', publishStatus: 'pending' },
    { value: 'eating', translation: 'кушать', publishStatus: 'approved' },
    { value: 'dancing', translation: 'танцевать', publishStatus: 'approved' },
    { value: 'sleeping', translation: 'спящий', publishStatus: 'approved' },
    { value: 'walking', translation: 'ходьба', publishStatus: 'approved' },
    { value: 'bright', translation: 'яркий', publishStatus: 'pending' },
    { value: 'light', translation: 'свет', publishStatus: 'approved' },
    { value: 'night', translation: 'ночь', publishStatus: 'approved' },
    { value: 'right', translation: 'верно', publishStatus: 'approved' },
    { value: 'fight', translation: 'драться', publishStatus: 'approved' }
];

export const LEXEME_DATA = {
    value: 'car',
    translation: 'авто'
};

export const LEXEME_WITH_LEARNER = {
    ...LEXEME_DATA,
    createdBy: LEARNER._id
};

export const LEXEME_WITH_MANAGER = {
    ...LEXEME_DATA,
    createdBy: MANAGER._id
};

export const UPDATED_LEXEME_DATA = {
    value: 'auto',
    translation: 'машина',
    definition: 'есть руль и 4 колеса',
    examples: [
        {
            id: uuid(),
            text: 'I have a red car',
            translation: 'У меня есть красная машина'
        }
    ]
};

export const APPROVED_LEXEME_DATA = {
    translation: 'автомобиль',
    definition: 'транспортное средство',
    examples: [
        {
            id: uuid(),
            text: 'The car is already coming',
            translation: 'Машина уже подъезжает'
        },
        {
            id: uuid(),
            text: 'The car crashed',
            translation: 'Машина разбилась'
        }
    ]
};

export const MERGE_LEXEME_1 = {
    value: 'cat',
    translation: 'кот',
    definition: 'an animal that meows',
    examples: [
        {
            id: uuid(),
            text: 'The cat is sleeping',
            translation: 'Кот спит'
        },
        {
            id: uuid(),
            text: 'The cat is eating',
            translation: 'Кот ест'
        }
    ]
};

export const MERGE_LEXEME_2 = {
    value: 'dog',
    translation: 'пёс',
    definition: 'an animal that barks',
    examples: [
        {
            id: uuid(),
            text: 'The dog is barking',
            translation: 'Пёс лает'
        },
        {
            id: uuid(),
            text: 'The dog is running',
            translation: 'Пёс бегает'
        }
    ]
};

export const MERGE_LEXEME_3 = {
    value: 'fox',
    translation: 'лиса',
    definition: 'a wild animal that is red',
    examples: [
        {
            id: uuid(),
            text: 'The fox is clever',
            translation: 'Лиса хитрая'
        },
        {
            id: uuid(),
            text: 'The fox is running',
            translation: 'Лиса бегает'
        }
    ]
};

export const MERGED_LEXEME = {
    value: 'catdog',
    translation: 'котопёс'
};

export const UPDATED_MERGE_LEXEME_1 = {
    value: 'kitty',
    translation: 'котёнок',
    definition: 'мяукает',
    examples: [
        {
            id: uuid(),
            text: 'The kitten loves milk',
            translation: 'Котёнок любит молоко'
        }
    ]
};

export const UPDATED_MERGE_LEXEME_2 = {
    value: 'doggie',
    translation: 'пёсель',
    definition: 'гавкает',
    examples: [
        {
            id: uuid(),
            text: 'The doggie is wagging its tail',
            translation: 'Пёсель виляет хвостом'
        }
    ]
};

export const UPDATED_MERGE_LEXEME_3 = {
    value: 'foxie',
    translation: 'лисичка',
    definition: 'рыжая',
    examples: [
        {
            id: uuid(),
            text: 'The foxie ate the chicken',
            translation: 'Лисичка съела цыпленка'
        }
    ]
};