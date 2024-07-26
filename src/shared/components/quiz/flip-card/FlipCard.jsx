import { useState } from 'react';

import FlipCardComponent from 'shared/components/flip-card';
import { shuffleAndFilter } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './FlipCard.module.scss';

export const getData = data => shuffleAndFilter(data);

export default function FlipCard({ item, updateStatus }) {
    const { id, value, translation, status } = item;

    const [isFlipped, setFlipped] = useState(false);

    const downStatus = () => {
        updateStatus(id, status - 1);
        setFlipped(false);
    };

    const upStatus = () => {
        updateStatus(id, status + 1);
        setFlipped(false);
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <FlipCardComponent
                    key={id}
                    front={
                        <Text
                            level="h3"
                            content={value}
                            end={
                                <LexemeStatus
                                    level={status}
                                    tooltipPlacement="right"
                                    readOnly
                                />
                            }
                        />
                    }
                    back={
                        <Text
                            level="h3"
                            content={translation}
                        />
                    }
                    flipped={isFlipped}
                    onFlip={() => setFlipped(true)}
                />
            </div>

            <div className={styles.actions}>
                {isFlipped ? (
                    <>
                        <Button
                            className={styles.action}
                            content="Не помню"
                            color="danger"
                            variant="soft"
                            onClick={downStatus}
                        />

                        <Button
                            className={styles.action}
                            content="Помню"
                            color="success"
                            variant="soft"
                            onClick={upStatus}
                        />
                    </>
                ) : (
                    <Button
                        content="Перевернуть карточку"
                        onClick={() => setFlipped(true)}
                    />
                )}
            </div>
        </div>
    );
}