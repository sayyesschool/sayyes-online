// TODO: Необходимо поправить логику шафла для TrueFalse и ChooseCorrect, чтобы в неправ ответы попадали и лексимы со статусом выучено
//       А для match отбрасывать остаток, если на карточку осталось меньше 5 лексим
const STATISTIC_DISPLAY_INTERVAL = 5;
const MATCH_ITEM_COUNT = 5;

export function sessionCardsCount(length) {
    return Math.min(length, STATISTIC_DISPLAY_INTERVAL);
}

export function shouldShowStatistic(statisticLength, everyCount) {
    return !!(statisticLength % everyCount === 0 && statisticLength !== 0);
}

function chunkArray(arr, n) {
    return arr.reduce((acc, val, index) => {
        if (index % n === 0) {
            acc.push(arr.slice(index, index + n));
        }

        return acc;
    }, []);
}

export function compareArrays(arr1, arr2) {
    return arr1.map((obj1, index) => {
        let obj2 = arr2[index];
        let statusDiff = obj1.value === obj2.value ? 1 : -1;

        return {
            ...obj1,
            newStatus: obj1.record.status + statusDiff
        };
    });
}

export function shuffleArr(arr) {
    if (!arr) return [];

    return Array(arr.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => arr[i]);
}

function filterLexemes(lexemes) {
    if (!lexemes) return [];

    return lexemes.filter(lexeme => lexeme.status < 5);
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

export function shuffleMatch(lexemes) {
    if (!lexemes) return;

    const flatItems = Array.isArray(lexemes?.[0]) ? lexemes.flat() : lexemes;

    const filteredLexemes = shuffleAndFilter(flatItems);

    return chunkArray(filteredLexemes, MATCH_ITEM_COUNT);
}