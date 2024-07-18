import { useCallback, useEffect, useState } from 'react';

import { shuffleChooseCorrect } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import Answer from './Answer';

import styles from './ChooseCorrect.module.scss';

export const getData = data => shuffleChooseCorrect(data);

export default function ChooseCorrect({ item, updateStatus }) {
    const { id, value, translation, translations, status } = item;

    const [answers, setAnswers] = useState(translations);
    const [currentAnswerId, setCurrentAnswerId] = useState(null);

    const currentAnswer = answers.find(answer => answer.id === currentAnswerId);

    useEffect(() => {
        setAnswers(translations);
    }, [translations]);

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
        const newStatus = isCorrect ? status + 1 : status - 1;

        updateStatus(id, newStatus);
        setCurrentAnswerId(null);
    }, [currentAnswer, id, status, translation, updateStatus]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {answers.map(answer => (
                    <Answer
                        key={answer.id}
                        answer={answer}
                        moveAnswer={moveAnswer}
                    />
                ))}

                <div className={styles.value}>
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

                    <Answer
                        answer={currentAnswer}
                        moveAnswer={moveAnswer}
                        isDropZone
                    />
                </div>
            </div>

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