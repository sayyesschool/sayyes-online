import { useCallback, useEffect, useState } from 'react';

import { sessionCardsCount, shouldShowStatistic } from '@/shared/libs/quiz';

export function useQuiz(_items, getData, updateItemStatus) {
    const [items, setItems] = useState(getData(_items));
    const [count, setCount] = useState(0);
    const [statistic, setStatistic] = useState([]);

    useEffect(() => {
        if (items || !_items) return;
        setItems(getData(_items));
    }, [_items, getData, items]);

    const flatItems = Array.isArray(items?.[0]) ? items.flat() : items;
    const currentItem = items?.[count];
    const statisticInterval = sessionCardsCount(items?.length);
    const showStatistic = shouldShowStatistic(count, statisticInterval);

    const updateStatistics = useCallback((itemId, newStatus) => {
        const newStatusPositive = Math.max(0, newStatus);
        const item = flatItems.flat().find(i => i.id === itemId);
        const areStatusesDifferent = item.status !== newStatusPositive;

        setStatistic(prevStatistic => {
            return [
                ...prevStatistic,
                {
                    id: item.id,
                    value: item.value,
                    oldStatus: item.status,
                    newStatus: newStatusPositive
                }
            ];
        });

        return areStatusesDifferent;
    }, [flatItems]);

    const updateStatus = useCallback(arr => {
        arr.forEach(async ({ id, newStatus }) => {
            const areStatusesDifferent = updateStatistics(id, newStatus);

            if (areStatusesDifferent) {
                await updateItemStatus(id, newStatus);
            }
        });

        if (count < items?.length)
            setCount(prevCount => prevCount + 1);
    }, [count, items?.length, updateItemStatus, updateStatistics]);

    const continueQuiz = useCallback(() => {
        if (!items?.length) return;

        setItems(getData(_items));
        setCount(0);
        setStatistic([]);
    }, [_items, getData, items?.length]);

    return {
        items,
        numberOfItems: items?.length ?? 0,
        currentItem,
        currentItemIndex: count,
        statistic,
        updateStatus,
        continueQuiz,
        showStatistic
    };
}