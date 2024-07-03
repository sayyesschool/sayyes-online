import { useState } from 'react';

import { sessionCardsCount } from '@/shared/libs/quiz';
import { shuffleAndFilter } from '@/shared/libs/quiz';
import FlipCard from 'shared/components/flip-card';
import StatusCircles from 'shared/components/status-circles';
import { Button, Stepper, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './FlipCards.module.scss';

export const getData = data => shuffleAndFilter(data);

export default function FlipCards({ item, itemIndex, numberOfItems, updateStatus }) {
    const [isCardFlip, setIsCardFlip] = useState(false);
    const stepsCount = sessionCardsCount(numberOfItems);
    const { id, value, translation, record } = item;

    const downStatus = () => {
        updateStatus(id, record?.status - 1);
        setIsCardFlip(false);
    };

    const upStatus = () => {
        updateStatus(id, record?.status + 1);
        setIsCardFlip(false);
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <StatusCircles status={record?.status} />
            </div>

            <FlipCard
                key={id}
                front={<Text level="title-lg">{value}</Text>}
                back={<Text level="title-lg">{translation}</Text>}
                isCardFlip1={isCardFlip}
                onFlip={() => setIsCardFlip(true)}
            />

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
                {isCardFlip ? (
                    <>
                        <Button
                            className={styles.button}
                            content="Не помню"
                            color="danger"
                            variant="soft"
                            onClick={downStatus}
                        />

                        <Button
                            className={styles.button}
                            content="Помню"
                            color="success"
                            variant="soft"
                            onClick={upStatus}
                        />
                    </>
                ) : (
                    <Button
                        className={styles.button}
                        content="Перевернуть карточку"
                        onClick={() => setIsCardFlip(true)}
                    />
                )}
            </div>
        </div>
    );
}