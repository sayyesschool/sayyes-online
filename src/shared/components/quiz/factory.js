import ChooseCorrect, { getData as getChooseCorrectData } from './choose-correct';
import FlipCards, { getData as getFlipCardsData } from './flip-cards';
import TrueFalse, { getData as getTrueFalseData } from './true-false';

const components = {
    'flip-cards': {
        Component: FlipCards,
        getData: getFlipCardsData
    },
    'true-false': {
        Component: TrueFalse,
        getData: getTrueFalseData
    },
    'choose-correct': {
        Component: ChooseCorrect,
        getData: getChooseCorrectData
    }
};

const defaultComponent = {
    Component: () => null,
    getData: data => data
};

export function getComponent(type) {
    return components[type] ?? defaultComponent;
}