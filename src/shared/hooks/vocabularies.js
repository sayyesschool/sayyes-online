import { useCallback, useEffect, useState } from 'react';

import { shuffleAndFilter } from '@/shared/utils/fn';
import { useActions, useStore } from 'shared/hooks/store';
import { actions as vocabulariesActions } from 'shared/store/modules/vocabularies';
import { hasKey } from 'shared/utils/object';

const STATISTIC_DISPLAY_INTERVAL = 5;

const calculateEveryCount = length => {
    return length < STATISTIC_DISPLAY_INTERVAL
        ? Math.ceil(length / 2)
        : STATISTIC_DISPLAY_INTERVAL;
};

const shouldShowStatistic = (statisticLength, everyCount) => {
    return !!(statisticLength % everyCount === 0 && statisticLength !== 0);
};

export function useVocabularyQuiz(listData, updateLexemeStatus) {
    const [list, setList] = useState(listData ?? []);
    const [count, setCount] = useState(0);
    const [statistic, setStatistic] = useState([]);
    const statisticInterval = calculateEveryCount(list.length);
    const showStatistic = shouldShowStatistic(
        statistic.length,
        statisticInterval
    );
    const lexeme = list?.[count];
    const isQuizNotAvaiable = !list?.length;

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

    const updateList = (id, newStatus) => {
        setList(prevList =>
            prevList
                .map(item =>
                    item.id === id
                        ? { ...item, record: { ...item.record, status: newStatus } }
                        : item
                )
                .filter(item => item.record.status < 4)
        );
    };

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
        [list.length, updateLexemeStatus, updateStatistics]
    );

    const continueGame = () => {
        if (!list.length) return;
        setList(list => shuffleAndFilter(list));
        setStatistic([]);
        setCount(0);
    };

    useEffect(() => {
        if (listData) {
            setList(shuffleAndFilter(listData));
        }
    }, [listData]);

    return {
        isQuizNotAvaiable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    };
}

export function useVocabularies(query) {
    const [vocabularies, actions] = useStore(
        state => state && hasKey(state.vocabularies, 'list') ?
            state.vocabularies.list :
            state.vocabularies,
        vocabulariesActions
    );

    useEffect(() => {
        if (!vocabularies) {
            actions.getVocabularies(query);
        }
    }, [vocabularies]);

    return [vocabularies, actions];
}

export function useVocabulary(id) {
    const [vocabulary, actions] = useStore(
        state => state && hasKey(state.vocabularies, 'single') ?
            state.vocabularies.single :
            state.vocabulary,
        vocabulariesActions
    );

    useEffect(() => {
        if (!id) return;

        if (!vocabulary) {
            actions.getVocabulary(id);
        }

        return () => actions.unsetVocabulary();
    }, [id]);

    return [vocabulary, actions];
}

export function useVocabularyActions() {
    return useActions(
        vocabulariesActions
    );
}