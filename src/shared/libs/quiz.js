const STATISTIC_DISPLAY_INTERVAL = 5;
const MATCH_ITEM_COUNT = 5;

export function sessionCardsCount(length) {
    return Math.min(length, STATISTIC_DISPLAY_INTERVAL);
}

export function shouldShowStatistic(statisticLength, everyCount) {
    return !!(statisticLength % everyCount === 0 && statisticLength !== 0);
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function chunkArray(arr, n) {
    return arr.reduce((acc, val, index) => {
        if (index % n === 0) {
            const chunk = arr.slice(index, index + n);

            if (chunk.length === n) acc.push(chunk);
        }

        return acc;
    }, []);
}

export function compareArrays(array1, array2) {
    return array1.map((item1, index) => {
        const item2 = array2[index];
        const statusDiff = item1.id === item2.id ? 1 : -1;

        return {
            ...item1,
            newStatus: item1.status + statusDiff
        };
    });
}

export function shuffleArray(arr) {
    if (!arr) return [];

    return Array(arr.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => arr[i]);
}

export function shuffleLetters(word = '') {
    if (word.length < 2) return word;

    let shuffled;

    do {
        shuffled = shuffleArray(word.split('')).join('');
    } while (shuffled === word);

    return shuffled;
}

export function filterLexemes(lexemes) {
    if (!lexemes) return [];

    return lexemes.filter(lexeme => lexeme.status < 5);
}

export function shuffleAndFilter(lexemes) {
    if (!lexemes) return;

    return shuffleArray(filterLexemes(lexemes));
}

function getCorrectLexemes(lexemes, count) {
    return lexemes
        .slice(0, count)
        .map(item => ({ ...item, incorrectTranslation: null }));
}

function getIncorrectLexemes(filteredLexemes, lexemes, count) {
    if (count === 0) return [];

    const correctLexemes = filteredLexemes.slice(-count);

    const incorrectLexemes = correctLexemes.map(element => {
        const shuffledLexemes = shuffleArray(lexemes);
        const incorrectTranslation = shuffledLexemes.find(
            lexeme => lexeme.id !== element.id
        ).translation;

        return {
            ...element,
            incorrectTranslation
        };
    });

    return incorrectLexemes;
}

export function shuffleTrueFalse(lexemes, incorrectLexemesProportion = 1) {
    if (!lexemes) return;

    const filteredLexemes = shuffleAndFilter(lexemes);

    const incorrectLexemesCount = Math.floor((incorrectLexemesProportion / 3) * filteredLexemes.length);
    const correctLexemesCount = filteredLexemes.length - incorrectLexemesCount;

    const correctLexemes = getCorrectLexemes(filteredLexemes, correctLexemesCount);
    const incorrectLexemes = getIncorrectLexemes(filteredLexemes, lexemes, incorrectLexemesCount);

    return shuffleArray([...correctLexemes, ...incorrectLexemes]);
}

export function shuffleChooseCorrect(lexemes) {
    if (!lexemes) return;

    const filteredLexemes = shuffleAndFilter(lexemes);

    return filteredLexemes.map(lexeme => {
        const isValue = getRandomBoolean();

        const lexemesWithoutCurrent = shuffleArray(lexemes).filter(
            lexemeItem => lexemeItem.id !== lexeme.id
        );

        const randomLexemes = shuffleArray(
            [
                lexeme,
                lexemesWithoutCurrent[0],
                lexemesWithoutCurrent[1],
                lexemesWithoutCurrent[2]
            ].filter(Boolean)
        );

        return { ...lexeme, randomLexemes, isValue };
    });
}

export function shuffleMatch(lexemes) {
    if (!lexemes) return;

    const flatItems = Array.isArray(lexemes?.[0]) ? lexemes.flat() : lexemes;

    const filteredLexemes = shuffleAndFilter(flatItems);

    return chunkArray(filteredLexemes, MATCH_ITEM_COUNT);
}

export function getStatusDifference(oldStatus, newStatus) {
    const difference = newStatus - oldStatus;
    const sign = difference > 0 ? '+' : '';

    return `${sign}${difference}`;
}