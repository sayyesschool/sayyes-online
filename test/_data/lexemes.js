import { v4 as uuid } from 'uuid';

export const LEXEME = { value: 'car', translation: 'авто' };

export const LEXEMES = [
    { value: 'dog', translation: 'собака', publishStatus: 'pending' },
    { value: 'cat', translation: 'киса', publishStatus: 'unapproved' },
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

export const UPDATED_LEXEME_DATA = {
    value: 'auto',
    translation: 'машина',
    definition: 'есть руль и 4 колеса',
    examples: [
        { id: uuid(), text: 'I have a red car', translation: 'У меня есть красная машина' }
    ]
};

export const APPROVED_LEXEME_DATA = {
    translation: 'автомобиль',
    definition: 'транспортное средство',
    examples: [
        { id: uuid(), text: 'The car is already coming', translation: 'Машина уже подъезжает' },
        { id: uuid(), text: 'The car crashed', translation: 'Машина разбилась' }
    ]
};

export const MERGE_LEXEME_1 = {
    value: 'cat',
    translation: 'кот'
};

export const MERGE_LEXEME_2 = {
    value: 'dog',
    translation: 'пёс'
};

export const MERGE_LEXEME_3 = {
    value: 'fox',
    translation: 'лиса'
};

export const UPDATED_MERGE_LEXEME_1 = {
    value: 'kitty',
    translation: 'котёнок',
    definition: 'мяукает',
    examples: [
        { id: uuid(), text: 'The kitten loves milk', translation: 'Котёнок любит молоко' }
    ]
};

export const UPDATED_MERGE_LEXEME_2 = {
    value: 'doggie',
    translation: 'пёсель',
    definition: 'гавкает',
    examples: [
        { id: uuid(), text: 'The doggie is wagging its tail', translation: 'Пёсель виляет хвостом' }
    ]
};

export const UPDATED_MERGE_LEXEME_3 = {
    value: 'foxie',
    translation: 'лисичка',
    definition: 'рыжая',
    examples: [
        { id: uuid(), text: 'The foxie ate the chicken', translation: 'Лисичка съела цыпленка' }
    ]
};

export const MERGED_LEXEME = {
    value: 'CatDog',
    translation: 'КотоПёс'
};