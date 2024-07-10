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

    const currentItem = items?.[count];
    const statisticInterval = sessionCardsCount(items?.length);
    const showStatistic = shouldShowStatistic(count, statisticInterval);

    const updateStatistics = useCallback(
        newStatus => {
            setStatistic(prevStatistic => {
                return [
                    ...prevStatistic,
                    {
                        id: currentItem.id,
                        value: currentItem.value,
                        oldStatus: currentItem.record.status,
                        newStatus
                    }
                ];
            });
        },
        [currentItem]
    );

    const updateList = useCallback((itemId, newStatus) => {
        setItems(items =>
            items.map(item =>
                item.id !== itemId
                    ? item
                    : {
                        ...item,
                        record: {
                            ...item.record,
                            status: newStatus
                        }
                    }
            )
        );
    }, []);

    const updateStatus = useCallback(
        async (itemId, newStatus) => {
            if (newStatus >= 0) {
                await updateItemStatus(itemId, newStatus);
                updateList(itemId, newStatus);
                updateStatistics(newStatus);
            }

            if (count < items?.length) setCount(prevCount => prevCount + 1);
        },
        [count, items?.length, updateItemStatus, updateList, updateStatistics]
    );

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
        continueQuiz,
        showStatistic
    };
}