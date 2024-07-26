import { useHistory } from 'react-router-dom';

import { getComponent } from 'shared/components/quiz';
import { useQuiz } from 'shared/hooks/quizzes';

import VocabularyQuizEmptyState from './VocabularyQuizEmptyState';
import VocabularyQuizItem from './VocabularyQuizItem';
import VocabularyQuizStatistic from './VocabularyQuizStatistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({
    vocabulary,
    quizType,
    updateLexemeStatus
}) {
    const history = useHistory();

    const { Component, getData } = getComponent(quizType);

    const {
        numberOfItems,
        currentItem,
        currentItemIndex,
        updateStatus,
        updateStatuses,
        continueQuiz,
        statistic,
        showStatistic
    } = useQuiz(vocabulary?.lexemes, getData, updateLexemeStatus);

    const handleBack = () => history.goBack();

    if (!Component) throw new Error('No component for quiz');

    return (
        <div className={styles.quiz}>
            {showStatistic ?
                <VocabularyQuizStatistic
                    statistic={statistic}
                    onContinue={continueQuiz}
                    onBack={handleBack}
                /> :
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
                            updateStatuses={updateStatuses}
                        />
                    ) : (
                        <VocabularyQuizEmptyState onAction={handleBack} />
                    )}
                </VocabularyQuizItem>
            }
        </div>
    );
}