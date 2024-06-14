import VocabularyFlipCards from 'lms/components/vocabulary/vocabulary-flip-cards';
import VocabularyTrueFalse from 'lms/components/vocabulary/vocabulary-true-false';

const parseArr = arr => arr;

export const trainerComponents = {
    'flip-cards': {
        component: VocabularyFlipCards,
        dataParser: lexemes => lexemes
    },
    'true-false': {
        component: VocabularyTrueFalse,
        dataParser: lexemes => parseArr(lexemes)
    }
};