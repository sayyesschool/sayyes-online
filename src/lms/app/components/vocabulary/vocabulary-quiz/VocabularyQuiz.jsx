import { useCallback } from 'react';

import Page from 'shared/components/page';
import { getComponent } from 'shared/components/quiz';
import { useQuiz } from 'shared/hooks/quizzes';

import VocabularyQuizEmptyState from './VocabularyQuizEmptyState';
import VocabularyQuizItem from './VocabularyQuizItem';
import VocabularyQuizStatistic from './VocabularyQuizStatistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({
    vocabulary,
    quizType,
    onBack,
    updateLexemeStatus
}) {
    const { name, Component, getData } = getComponent(quizType);

    const {
        numberOfItems,
        currentItem,
        currentItemIndex,
        updateStatus,
        continueQuiz,
        statistic,
        showStatistic,
        finishQuiz
    } = useQuiz(vocabulary?.lexemes, getData, updateLexemeStatus);

    const onFinish = useCallback(() => {
        if (currentItemIndex === 0) {
            onBack();

            return;
        }

        finishQuiz();
    }, [currentItemIndex, finishQuiz, onBack]);

    if (!Component) throw new Error('No component for quiz');

    return (
        <>
            <Page.Header
                title={name}
                actions={!showStatistic && [
                    {
                        key: 'front_hand',
                        icon: 'front_hand',
                        variant: 'soft',
                        content: 'Завершить тренировку',
                        onClick: onFinish
                    }
                ]}
            />

            <Page.Content>
                <div className={styles.quiz}>
                    {showStatistic ? (
                        <VocabularyQuizStatistic
                            statistic={statistic}
                            onContinue={continueQuiz}
                            onBack={onBack}
                        />
                    ) : (
                        <VocabularyQuizItem
                            item={currentItem}
                            itemIndex={currentItemIndex}
                            numberOfItems={numberOfItems}
                        >
                            {currentItem ? (
                                <Component
                                    item={currentItem}
                                    itemIndex={currentItemIndex}
                                    numberOfItems={numberOfItems}
                                    updateStatus={updateStatus}
                                />
                            ) : (
                                <VocabularyQuizEmptyState onAction={onBack} />
                            )}
                        </VocabularyQuizItem>
                    )}
                </div>
            </Page.Content>
        </>
    );
}