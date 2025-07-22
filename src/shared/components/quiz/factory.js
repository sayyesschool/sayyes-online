import ChooseCorrect, { getData as getChooseCorrectData } from './choose-correct';
import FlipCard, { getData as getFlipCardData } from './flip-card';
import Match, { getData as getMatchData } from './match';
import Scrabble, { getData as getScrabbleData } from './scrabble';
import TrueFalse, { getData as getTrueFalseData } from './true-false';

const components = {
    'flip-cards': {
        name: 'Flip Cards',
        Component: FlipCard,
        getData: getFlipCardData
    },
    'true-false': {
        name: 'True / False',
        Component: TrueFalse,
        getData: getTrueFalseData
    },
    'choose-correct': {
        name: 'Choose Correct',
        Component: ChooseCorrect,
        getData: getChooseCorrectData
    },
    'match': {
        name: 'Match',
        Component: Match,
        getData: getMatchData
    },
    'scrabble': {
        name: 'Scrabble',
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