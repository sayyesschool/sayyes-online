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

    const updateStatistics = useCallback(
        (itemId, newStatus) => {
            setStatistic(prevStatistic => {
                const item = flatItems.find(i => i.id === itemId);

                return [
                    ...prevStatistic,
                    {
                        id: item.id,
                        value: item.value,
                        oldStatus: item.status,
                        newStatus
                    }
                ];
            });
        },
        [flatItems]
    );

    const updateList = useCallback((itemId, newStatus) => {
        setItems(items =>
            items.map(subArray =>
                Array.isArray(subArray)
                    ? subArray.map(item =>
                        item.id !== itemId
                            ? item
                            : {
                                ...item,
                                status: newStatus
                            }
                    )
                    : subArray.id !== itemId
                        ? subArray
                        : {
                            ...subArray,
                            status: newStatus
                        }
            )
        );
    }, []);

    const updateStatus = useCallback(
        async (itemId, newStatus, skipSetCount = false) => {
            if (newStatus >= 0) {
                await updateItemStatus(itemId, newStatus);
                updateList(itemId, newStatus);
                updateStatistics(itemId, newStatus);
            } else {
                updateStatistics(itemId, 0);
            }

            if (skipSetCount) return;

            if (count < flatItems?.length)
                setCount(prevCount => prevCount + 1);
        },
        [count, flatItems?.length, updateItemStatus, updateList, updateStatistics]
    );

    const updateStatuses = useCallback(arr => {
        arr.forEach(item => updateStatus(item.id, item.newStatus, true));

        if (count < flatItems?.length) setCount(prevCount => prevCount + 1);
    }, [count, flatItems?.length, updateStatus]);

    const continueQuiz = useCallback(() => {
        if (!items?.length) return;

        setItems(list => getData(list));
        setCount(0);
        setStatistic([]);
    }, [getData, items?.length]);

    return {
        items,
        numberOfItems: items?.length ?? 0,
        currentItem,
        currentItemIndex: count,
        statistic,
        updateStatus,
        updateStatuses,
        continueQuiz,
        showStatistic
    };
}