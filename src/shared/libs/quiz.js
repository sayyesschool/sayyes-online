// TODO: Необходимо поправить логику шафла для TrueFalse и ChooseCorrect, чтобы в неправ ответы попадали и лексимы со статусом выучено
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

    const filteredLexemes = filterLexemes(lexemes);

    const incorrectLexemesCount = Math.floor((incorrectLexemesProportion / 3) * filteredLexemes.length);
    const correctLexemesCount = filteredLexemes.length - incorrectLexemesCount;

    const correctLexemes = getCorrectLexemes(filteredLexemes, correctLexemesCount);
    const incorrectLexemes = getIncorrectLexemes(filteredLexemes, incorrectLexemesCount);

    return shuffleArr([...correctLexemes, ...incorrectLexemes]);
}

export function shuffleChooseCorrect(lexemes) {
    if (!lexemes) return;

    const filteredLexemes = shuffleAndFilter(lexemes);

    return shuffleArr(
        filteredLexemes.map(lexeme => {
            const shuffledTranslations = filteredLexemes.filter(
                lexemeItem => lexemeItem.translation !== lexeme.translation
            );
            const translations = shuffleArr(
                [
                    lexeme,
                    shuffledTranslations[0],
                    shuffledTranslations[1],
                    shuffledTranslations[2]
                ].filter(Boolean)
            );

            return { ...lexeme, translations };
        })
    );
}