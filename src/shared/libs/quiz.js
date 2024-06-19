const STATISTIC_DISPLAY_INTERVAL = 5;

export function sessionCardsCount(length) {
    return Math.min(length, STATISTIC_DISPLAY_INTERVAL);
}

export function shouldShowStatistic(statisticLength, everyCount) {
    return !!(statisticLength % everyCount === 0 && statisticLength !== 0);
}

export function shuffleAndFilter(lexemes) {
    if (!lexemes) return [];

    return Array(lexemes.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => lexemes[i])
        .filter(lexeme => {
            const status = lexeme.record.status;

            return status < 5;
        });
}

function getCorrectLexemes(lexemes, count) {
    return lexemes.slice(0, count).map(item => ({ ...item, isCorrect: true }));
}

function getIncorrectLexemes(lexemes, count) {
    const correctLexemes = lexemes.slice(-count);

    const incorrectLexemes = correctLexemes.map((element, index, arr) => ({
        ...element,
        translation: arr[(index + 1) % arr.length].translation,
        isCorrect: false
    }));

    return incorrectLexemes;
}

export function shuffleTrueFalse(lexemes, incorrectLexemesProportion = 1) {
    if (!lexemes) return undefined;

    const incorrectLexemesCount = Math.floor((incorrectLexemesProportion / 3) * lexemes.length);
    const correctLexemesCount = lexemes.length - incorrectLexemesCount;

    const correctLexemes = getCorrectLexemes(lexemes, correctLexemesCount);
    const incorrectLexemes = getIncorrectLexemes(lexemes, incorrectLexemesCount);

    return [...correctLexemes, ...incorrectLexemes];
}