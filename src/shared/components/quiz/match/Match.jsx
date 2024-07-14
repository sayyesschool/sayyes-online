import { useCallback, useEffect, useState } from 'react';

import {
    compareArrays,
    sessionCardsCount,
    shuffleMatch
} from '@/shared/libs/quiz';
import { shuffleArr } from '@/shared/libs/quiz';
import { Button, Stepper } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import AnswerList from './AnswerList';

import styles from './Match.module.scss';

export const ItemTypes = {
    VALUE: 'value',
    TRANSLATION: 'translation'
};

const isSameItem = (activeItem, item, type) => activeItem?.id === item.id && activeItem?.type === type;

export const getData = data => shuffleMatch(data);

export default function Match({
    item,
    itemIndex,
    numberOfItems,
    updateStatuses
}) {
    const [values, setValues] = useState(item);
    const [translations, setTranslations] = useState(shuffleArr(item));
    const [activeItems, setActiveItems] = useState({ first: null, second: null });
    const stepsCount = sessionCardsCount(numberOfItems);

    console.log('activeItems', { activeItems }, { values, translations });

    const onMoveAnswer = useCallback(itemsSetter => (dragIndex, hoverIndex) => {
        itemsSetter(prevItems => {
            const newItems = [...prevItems];
            const [draggedItem] = newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, draggedItem);

            return newItems;
        });
    }, []);

    const moveItemsToTop = useCallback((item, firstItem, type) => {
        const moveToTop = (list, newItem) => [newItem, ...list.filter(i => i.id !== newItem.id)];

        const updateValuesAndTranslations = (valuesList, translationsList) => {
            setValues(valuesList);
            setTranslations(translationsList);
        };

        const newValues = type === ItemTypes.VALUE ? moveToTop(values, item) : moveToTop(values, firstItem);
        const newTranslations = type === ItemTypes.VALUE ? moveToTop(translations, firstItem) : moveToTop(translations, item);

        updateValuesAndTranslations(newValues, newTranslations);
    }, [values, translations]);

    const onClickAnswer = useCallback((item, type) => {
        const isActiveFirst = isSameItem(activeItems.first, item, type);
        const isActiveSecond = isSameItem(activeItems.second, item, type);

        if (isActiveFirst) {
            setActiveItems(prev => ({ ...prev, first: null }));

            return;
        }

        if (isActiveSecond) {
            setActiveItems(prev => ({ ...prev, second: null }));

            return;
        }

        if (activeItems.first && activeItems.first.type !== type) {
            setActiveItems(prev => ({ ...prev, second: { ...item, type } }));

            setTimeout(() => {
                moveItemsToTop(item, activeItems.first, type);
            }, 300);

            setTimeout(() => {
                setActiveItems({ first: null, second: null });
            }, 500);

            return;
        }

        setActiveItems(prev => ({ ...prev, first: { ...item, type } }));
    }, [activeItems, moveItemsToTop]);

    const next = useCallback(() => {
        const result = compareArrays(values, translations);

        updateStatuses(result);
    }, [translations, updateStatuses, values]);

    useEffect(() => {
        setValues(item);
        setTranslations(shuffleArr(item));
    }, [item]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.values}>
                    <AnswerList
                        answers={values}
                        type={ItemTypes.VALUE}
                        activeItems={activeItems}
                        onClickAnswer={onClickAnswer}
                        onMoveAnswer={onMoveAnswer(setValues)}
                    />
                </div>

                <div className={styles.translations}>
                    <AnswerList
                        answers={translations}
                        type={ItemTypes.TRANSLATION}
                        activeItems={activeItems}
                        onClickAnswer={onClickAnswer}
                        onMoveAnswer={onMoveAnswer(setTranslations)}
                    />
                </div>
            </div>

            <Stepper
                steps={Array.from({ length: stepsCount }).map((_, index) => ({
                    active: index === itemIndex,
                    orientation: 'vertical',
                    indicator: (
                        <span
                            className={cn(
                                styles.indicator,
                                index === itemIndex && styles.active,
                                index < itemIndex && styles.prev
                            )}
                        />
                    )
                }))}
                size="sm"
            />

            <div className={styles.actions}>
                <Button
                    content="Далее"
                    className={styles.button}
                    onClick={next}
                />
            </div>
        </div>
    );
}