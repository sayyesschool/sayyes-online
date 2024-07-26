import { useCallback } from 'react';

import { shuffleTrueFalse } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './TrueFalse.module.scss';

export const getData = data => shuffleTrueFalse(data);

export default function TrueFalse({ item, updateStatus }) {
    const { id, value, translation, incorrectTranslation, status } = item;

    const handleAnswer = useCallback(
        isTrue => {
            let newStatus;

            if (isTrue) {
                newStatus = incorrectTranslation ? status - 1 : status + 1;
            } else {
                newStatus = incorrectTranslation ? -1 : status - 1;
            }

            updateStatus(id, newStatus);
        },
        [id, status, incorrectTranslation, updateStatus]
    );

    const handleTrueClick = useCallback(() => {
        handleAnswer(true);
    }, [handleAnswer]);

    const handleFalseClick = useCallback(() => {
        handleAnswer(false);
    }, [handleAnswer]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Text
                    type="h3"
                    content={value}
                    end={
                        <LexemeStatus
                            level={status}
                            tooltipPlacement="right"
                            readOnly
                        />
                    }
                />

                <Text
                    type="title-lg"
                    content={incorrectTranslation ?? translation}
                    color="neutral"
                />
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.action}
                    content="FALSE"
                    color="danger"
                    variant="solid"
                    onClick={handleFalseClick}
                />

                <Button
                    className={styles.action}
                    content="TRUE"
                    color="success"
                    variant="solid"
                    onClick={handleTrueClick}
                />
            </div>
        </div>
    );
}