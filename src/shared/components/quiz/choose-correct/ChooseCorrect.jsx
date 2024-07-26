import { useCallback, useEffect, useState } from 'react';

import { shuffleChooseCorrect } from 'shared/libs/quiz';
import { Button, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import Answer from './Answer';

import styles from './ChooseCorrect.module.scss';

export const getData = data => shuffleChooseCorrect(data);

export default function ChooseCorrect({ item, updateStatus }) {
    const { id, value, translation, randomLexemes, isValue, status } = item;
    const [answers, setAnswers] = useState(randomLexemes);
    const [currentAnswerId, setCurrentAnswerId] = useState(null);
    const currentAnswer = answers.find(answer => answer.id === currentAnswerId);
    const currentAnswerText = isValue ? currentAnswer?.translation : currentAnswer?.value;
    const labelText = isValue ? value : translation;

    useEffect(() => {
        setAnswers(randomLexemes);
    }, [randomLexemes]);

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

        const isCorrect = id === currentAnswer.id;
        const newStatus = isCorrect ? status + 1 : status - 1;

        updateStatus(id, newStatus);
        setCurrentAnswerId(null);
    }, [currentAnswer, id, status, updateStatus]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {randomLexemes.map(answer =>
                    <Answer
                        key={answer.id}
                        text={isValue ? answer.translation : answer.value}
                        answer={answer}
                        moveAnswer={moveAnswer}
                    />
                )}

                <div className={styles.value}>
                    <Text
                        type="h3"
                        content={labelText}
                        end={
                            <LexemeStatus
                                level={status} tooltipPlacement="right"
                                readOnly
                            />
                        }
                    />

                    <Answer
                        text={currentAnswerText}
                        answer={currentAnswer}
                        moveAnswer={moveAnswer}
                        isDropZone
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.nextButton}
                    content="Далее"
                    disabled={!currentAnswerId}
                    onClick={next}
                />
            </div>
        </div>
    );
}