import ChooseCorrect, { getData as getChooseCorrectData } from './choose-correct';
import FlipCard, { getData as getFlipCardData } from './flip-card';
import Match, { getData as getMatchData } from './match';
import Scrabble, { getData as getScrabbleData } from './scrabble';
import TrueFalse, { getData as getTrueFalseData } from './true-false';

const components = {
    'flip-card': {
        Component: FlipCard,
        getData: getFlipCardData
    },
    'true-false': {
        Component: TrueFalse,
        getData: getTrueFalseData
    },
    'choose-correct': {
        Component: ChooseCorrect,
        getData: getChooseCorrectData
    },
    'match': {
        Component: Match,
        getData: getMatchData
    },
    'scrabble': {
        Component: Scrabble,
        getData: getScrabbleData
    }
};

const defaultComponent = {
    Component: () => null,
    getData: data => data
};

export function getComponent(type) {
    return components[type] ?? defaultComponent;
}