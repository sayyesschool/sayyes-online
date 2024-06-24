const STATISTIC_DISPLAY_INTERVAL = 5;

export function sessionCardsCount(length) {
    return Math.min(length, STATISTIC_DISPLAY_INTERVAL);
}

export function shouldShowStatistic(statisticLength, everyCount) {
    return !!(statisticLength % everyCount === 0 && statisticLength !== 0);
}

function shuffleArr(arr) {
    if (!arr) return [];

    return Array(arr.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => arr[i]);
}

function filterLexemes(lexemes) {
    if (!lexemes) return [];

    return lexemes.filter(lexeme => {
        const status = lexeme.record.status;

        return status < 5;
    });
}

export function shuffleAndFilter(lexemes) {
    if (!lexemes) return;

    return shuffleArr(filterLexemes(lexemes));
}

function getCorrectLexemes(lexemes, count) {
    return lexemes
        .slice(0, count)
        .map(item => ({ ...item, incorrectTranslation: null }));
}

function getIncorrectLexemes(lexemes, count) {
    const correctLexemes = lexemes.slice(-count);

    const incorrectLexemes = correctLexemes.map(element => {
        const shuffledLexemes = shuffleArr(lexemes);
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

    const shuffledLexemes = filterLexemes(lexemes);

    const incorrectLexemesCount = Math.floor((incorrectLexemesProportion / 3) * shuffledLexemes.length);
    const correctLexemesCount = shuffledLexemes.length - incorrectLexemesCount;

    const correctLexemes = getCorrectLexemes(shuffledLexemes, correctLexemesCount);
    const incorrectLexemes = getIncorrectLexemes(shuffledLexemes, incorrectLexemesCount);

    return shuffleArr([...correctLexemes, ...incorrectLexemes]);
}