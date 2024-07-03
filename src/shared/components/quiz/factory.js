import ChooseCorrect, { getCallback as getChooseCorrectCallback } from './choose-correct';
import FlipCards, { getCallback as getFlipCardsCallback } from './flip-cards';
import TrueFalse, { getCallback as getTrueFalseCallback } from './true-false';

const components = {
    'flip-cards': {
        Component: FlipCards,
        getCallback: getFlipCardsCallback
    },
    'true-false': {
        Component: TrueFalse,
        getCallback: getTrueFalseCallback
    },
    'choose-correct': {
        Component: ChooseCorrect,
        getCallback: getChooseCorrectCallback
    }
};

const defaultComponent = {
    Component: () => null,
    getCallback: data => data
};

export function getComponent(type) {
    return components[type] ?? defaultComponent;
}