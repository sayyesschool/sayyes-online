import { LexemeKind, LexemeType } from 'core/models/lexeme/constants';

export { LexemeKind, LexemeType };

export const fieldLabels = {
    value: 'Значение',
    translation: 'Перевод',
    definition: 'Определение',
    examples: 'Примеры'
};

export const LexemeKindLabel = {
    [LexemeKind.Adjective]: 'Прилагательное',
    [LexemeKind.Adverb]: 'Наречие',
    [LexemeKind.Article]: 'Артикль',
    [LexemeKind.Conjunction]: 'Союз',
    [LexemeKind.Determiner]: 'Определитель',
    [LexemeKind.Interjection]: 'Междометие',
    [LexemeKind.Noun]: 'Существительное',
    [LexemeKind.Pronoun]: 'Местоимение',
    [LexemeKind.Preposition]: 'Предлог',
    [LexemeKind.Verb]: 'Глагол'
};

export const LexemeTypeLabel = {
    [LexemeType.Word]: 'Слово',
    [LexemeType.Phrase]: 'Фраза',
    [LexemeType.Sentence]: 'Предложение'
};

export const lexemeTypeOptions = Object.entries(LexemeTypeLabel)
    .map(([value, label]) => ({ value, label, content: label }));

export const lexemeKindOptions = Object.entries(LexemeKindLabel)
    .map(([value, label]) => ({ value, label, content: label }));