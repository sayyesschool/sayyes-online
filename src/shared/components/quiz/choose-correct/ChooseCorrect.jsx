import { useCallback, useEffect, useState } from 'react';

import { sessionCardsCount, shuffleChooseCorrect } from '@/shared/libs/quiz';
import StatusCircles from 'shared/components/status-circles';
import { Button, Stepper } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import Answer from './Answer';

import styles from './ChooseCorrect.module.scss';

export function getCallback(data) {
    return shuffleChooseCorrect(data);
}

export default function ChooseCorrect({
    item,
    itemIndex,
    numberOfItems,
    updateStatus
}) {
    const { id, value, translation, translations, record } = item;
    const [currentAnswerId, setCurrentAnswerId] = useState(null);
    const [answers, setAnswers] = useState(translations);
    const currentAnswer = answers.find(answer => answer.id === currentAnswerId);
    const stepsCount = sessionCardsCount(numberOfItems);

    const moveAnswer = useCallback(sourceId => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer => ({
                ...answer,
                isHidden: answer.id === sourceId ? !answer.isHidden : false
            }))
        );

        setCurrentAnswerId(prevId => (prevId === sourceId ? null : sourceId));
    }, []);

    const next = useCallback(() => {
        if (!currentAnswer) return;

        const isCorrect = translation === currentAnswer.translation;
        const newStatus = isCorrect ? record.status + 1 : record.status - 1;

        updateStatus(id, newStatus);
        setCurrentAnswerId(null);
    }, [currentAnswer, id, record.status, translation, updateStatus]);

    useEffect(() => {
        setAnswers(translations);
    }, [translations]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <StatusCircles status={record?.status} />
            </div>

            <div className={styles.content}>
                {answers.map(answer => (
                    <Answer
                        key={answer.id} answer={answer}
                        moveAnswer={moveAnswer}
                    />
                ))}

                <h1 className={styles.value}>{value}</h1>

                <Answer
                    answer={currentAnswer}
                    moveAnswer={moveAnswer}
                    isDropZone={true}
                />
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
                    className={styles.button}
                    content="Далее"
                    disabled={!currentAnswerId}
                    onClick={next}
                />
            </div>
        </div>
    );
}