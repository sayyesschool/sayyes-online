import { useCallback, useEffect, useState } from 'react';

import { calculateEveryCount, shouldShowStatistic, shuffleAndFilter } from '@/shared/libs/quiz';

export function useVocabularyQuiz(listData, updateLexemeStatus) {
    const [list, setList] = useState(listData ?? []);
    const [count, setCount] = useState(0);
    const [statistic, setStatistic] = useState([]);

    const lexeme = list?.[count];
    const isQuizNotAvailable = !list?.length;
    const statisticInterval = calculateEveryCount(list.length);
    const showStatistic = shouldShowStatistic(
        statistic.length,
        statisticInterval
    );

    const updateStatistics = useCallback(
        (id, newStatus) => {
            setStatistic(prevStatistic => {
                const hasInStatistic = prevStatistic.find(item => item.id === id);

                if (hasInStatistic) {
                    return prevStatistic.map(item =>
                        item.id === id ? { ...item, newStatus } : item
                    );
                } else {
                    return [
                        ...prevStatistic,
                        {
                            id: lexeme.id,
                            value: lexeme.value,
                            oldStatus: lexeme.record.status,
                            newStatus
                        }
                    ];
                }
            });
        },
        [lexeme?.id, lexeme?.record.status, lexeme?.value]
    );

    const updateList = useCallback((id, newStatus) => {
        setList(prevList =>
            prevList
                .map(item =>
                    item.id === id
                        ? { ...item, record: { ...item.record, status: newStatus } }
                        : item
                )
                .filter(item => item.record.status < 4)
        );
    }, []);

    const updateStatus = useCallback(
        async (id, newStatus) => {
            if (newStatus >= 0) {
                await updateLexemeStatus(id, newStatus);

                updateStatistics(id, newStatus);
                updateList(id, newStatus);
            }

            setCount(prevCount =>
                prevCount < list.length - 1 ? prevCount + 1 : 0
            );
        },
        [list.length, updateList, updateLexemeStatus, updateStatistics]
    );

    const continueGame = useCallback(() => {
        if (!list.length) return;
        setList(list => shuffleAndFilter(list));
        setStatistic([]);
        setCount(0);
    }, [list]);

    useEffect(() => {
        if (listData) {
            setList(shuffleAndFilter(listData));
        }
    }, [listData]);

    return {
        isQuizNotAvailable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    };
}