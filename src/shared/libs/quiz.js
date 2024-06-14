const STATISTIC_DISPLAY_INTERVAL = 5;

export function calculateEveryCount(length) {
    return length < STATISTIC_DISPLAY_INTERVAL
        ? Math.ceil(length / 2)
        : STATISTIC_DISPLAY_INTERVAL;
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

            return status < 4;
        });
}