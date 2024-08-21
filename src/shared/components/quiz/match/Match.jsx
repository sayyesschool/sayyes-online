import { useCallback, useEffect, useState } from 'react';

import { compareArrays, shuffleArray, shuffleMatch } from 'shared/libs/quiz';
import { Button } from 'shared/ui-components';

import AnswerList from './AnswerList';

import styles from './Match.module.scss';

export const ItemTypes = {
    VALUE: 'value',
    TRANSLATION: 'translation'
};

const isSameItem = (activeItem, item, type) => activeItem?.id === item.id && activeItem?.type === type;

export const getData = data => shuffleMatch(data);

export default function Match({ item, updateStatus }) {
    const [values, setValues] = useState(item);
    const [translations, setTranslations] = useState(shuffleArray(item));
    const [activeItems, setActiveItems] = useState({ first: null, second: null });

    useEffect(() => {
        setValues(item);
        setTranslations(shuffleArray(item));
    }, [item]);

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

        updateStatus(result);
    }, [translations, updateStatus, values]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <AnswerList
                    answers={values}
                    type={ItemTypes.VALUE}
                    activeItems={activeItems}
                    onClickAnswer={onClickAnswer}
                    onMoveAnswer={onMoveAnswer(setValues)}
                />

                <AnswerList
                    answers={translations}
                    type={ItemTypes.TRANSLATION}
                    activeItems={activeItems}
                    onClickAnswer={onClickAnswer}
                    onMoveAnswer={onMoveAnswer(setTranslations)}
                />
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.nextButton}
                    content="Далее"
                    onClick={next}
                />
            </div>
        </div>
    );
}