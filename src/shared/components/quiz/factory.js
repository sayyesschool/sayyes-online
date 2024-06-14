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
    }
};

const defaultComponent = {
    Component: () => null,
    getData: data => data
};

export function getComponent(type) {
    return components[type] ?? defaultComponent;
}