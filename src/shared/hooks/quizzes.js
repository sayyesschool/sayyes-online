import { useCallback, useEffect, useState } from 'react';

import { calculateEveryCount, shouldShowStatistic, shuffleAndFilter } from '@/shared/libs/quiz';

export function useQuiz(_items, updateItemStatus) {
    const [items, setItems] = useState(_items);
    const [count, setCount] = useState(0);
    const [statistic, setStatistic] = useState([]);

    useEffect(() => {
        if (items || !_items) return;

        setItems(shuffleAndFilter(_items));
    }, [items, _items]);

    const currentItem = items?.[count];
    const statisticInterval = calculateEveryCount(items?.length);
    const showStatistic = shouldShowStatistic(statistic.length, statisticInterval);

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
                            id: currentItem.id,
                            value: currentItem.value,
                            oldStatus: currentItem.record.status,
                            newStatus
                        }
                    ];
                }
            });
        },
        [currentItem]
    );

    const updateList = useCallback((itemId, newStatus) => {
        setItems(items =>
            items
                .map(item => item.id !== itemId ?
                    item :
                    {
                        ...item,
                        record: {
                            ...item.record,
                            status: newStatus
                        }
                    }
                )
                .filter(item => item.record.status < 4)
        );
    }, []);

    const updateStatus = useCallback(
        async (itemId, newStatus) => {
            if (newStatus >= 0) {
                await updateItemStatus(itemId, newStatus);
                updateList(itemId, newStatus);
                updateStatistics(itemId, newStatus);
            }

            setCount(prevCount =>
                prevCount < items?.length - 1 ? prevCount + 1 : 0
            );
        },
        [items?.length, updateItemStatus, updateList, updateStatistics]
    );

    const continueQuiz = useCallback(() => {
        if (!items?.length) return;

        setItems(list => shuffleAndFilter(list));
        setCount(0);
        setStatistic([]);
    }, [items]);

    return {
        items,
        numberOfItems: items?.length ?? 0,
        currentItem,
        currentItemIndex: count,
        updateStatus,
        continueQuiz,
        statistic,
        showStatistic
    };
}