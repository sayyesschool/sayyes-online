import lexemes from './lexemes';
import { learner } from './users';

export const builtInVocabulary = {
    title: 'Животные',
    published: true,
    lexemeIds: lexemes.slice(0, 2).map(l => l._id)
};

export const customVocabulary = {
    title: 'Созданный словарь',
    published: true,
    learnerId: learner._id,
    lexemeIds: lexemes.slice(3, 10).map(l => l._id)
};

export default [builtInVocabulary, customVocabulary];