import FlipCards from './flip-cards';
import TrueFalse from './true-false';

const components = {
    'flip-cards': {
        Component: FlipCards,
        getData: lexemes => lexemes
    },
    'true-false': {
        Component: TrueFalse,
        getData: lexemes => lexemes
    }
};

export function getComponent(type) {
    return components[type] ?? { getData: data => data };
}