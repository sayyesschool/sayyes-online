import { useCallback } from 'react';

import { sessionCardsCount, shuffleTrueFalse } from '@/shared/libs/quiz';
import StatusCircles from 'shared/components/status-circles';
import { Button, Stepper } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './TrueFalse.module.scss';

export function getCallback(data) {
    return shuffleTrueFalse(data);
}

export default function TrueFalse({
    item,
    itemIndex,
    numberOfItems,
    updateStatus
}) {
    const stepsCount = sessionCardsCount(numberOfItems);
    const { id, value, translation, record, incorrectTranslation } = item;

    // TODO: может стоит написать её как-то более лаконично с тернарником? С другой стороны можно оставить так как есть, так вроде более понятнее
    const handleAnswer = useCallback(
        isTrue => {
            let newStatus;

            if (isTrue) {
                newStatus = incorrectTranslation ? record?.status - 1 : record?.status + 1;
            } else {
                newStatus = incorrectTranslation ? -1 : record?.status - 1;
            }

            updateStatus(id, newStatus);
        },
        [id, record?.status, incorrectTranslation, updateStatus]
    );

    const handleTrueClick = useCallback(() => {
        handleAnswer(true);
    }, [handleAnswer]);

    const handleFalseClick = useCallback(() => {
        handleAnswer(false);
    }, [handleAnswer]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <StatusCircles status={record?.status} />
            </div>

            <h1 className={styles.value}>{value}</h1>

            <h2 className={styles.translation}>
                {incorrectTranslation ?? translation}
            </h2>

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
                    content="FALSE"
                    color="danger"
                    variant="soft"
                    onClick={handleFalseClick}
                />

                <Button
                    className={styles.button}
                    content="TRUE"
                    color="success"
                    variant="soft"
                    onClick={handleTrueClick}
                />
            </div>
        </div>
    );
}