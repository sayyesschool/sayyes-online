import { useCallback, useEffect, useState } from 'react';

import { shuffleAndFilter } from '@/shared/utils/fn';
import { useActions, useStore } from 'shared/hooks/store';
import { actions as vocabulariesActions } from 'shared/store/modules/vocabularies';
import { hasKey } from 'shared/utils/object';

const SHOW_QUIZ_CARD_EVERY_NUMBER = 5;

// TODO: нужен рефактор и желательно добавить комменты какие кейсы тренажёра тут покрываются
export function useVocabularyQuiz(listData, updateLexemeStatus) {
    const [list, setList] = useState(listData);
    const [count, setCount] = useState(0);
    const [statistic, setStatistic] = useState([]);
    const everyCount =
    list?.length < SHOW_QUIZ_CARD_EVERY_NUMBER
        ? Math.ceil(list?.length / 2)
        : SHOW_QUIZ_CARD_EVERY_NUMBER;
    const showStatistic = !!(
        statistic.length % everyCount === 0 && statistic.length !== 0
    );
    const lexeme = list?.[count];
    const isQuizAvaiable = !list?.length;

    const updateStatus = useCallback(
        async (id, newStatus) => {
            if (newStatus >= 0) {
                await updateLexemeStatus(id, newStatus);

                const updatedList = list
                    .map(item => {
                        if (item.id === id) {
                            return { ...item, record: { ...item.record, status: newStatus } };
                        }

                        return item;
                    })
                    .filter(item => item.record.status < 4);

                const status = list[count].record.status;
                const hasInStatistic = statistic.find(item => item.id === id);
                let actualStats;

                if (hasInStatistic) {
                    actualStats = statistic.map(item => {
                        if (hasInStatistic.id === item.id) {
                            return { ...hasInStatistic, newStatus };
                        }

                        return item;
                    });
                } else {
                    actualStats = [
                        ...statistic,
                        {
                            value: list[count].value,
                            oldStatus: status,
                            newStatus: newStatus,
                            id: list[count].id
                        }
                    ];
                }

                setList(updatedList);
                setStatistic(actualStats);
            }

            count < list.length - 1 ? setCount(last => last + 1) : setCount(0);
        },
        [count, list, statistic, updateLexemeStatus]
    );

    const continueGame = () => {
        if (!list.length) return;
        setList(list => shuffleAndFilter(list));
        setStatistic([]);
        setCount(0);
    };

    useEffect(() => {
        if (listData) {
            console.log(222, 'useEffect');
            setList(shuffleAndFilter(listData));
        }
    }, [listData]);

    return {
        isQuizAvaiable,
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