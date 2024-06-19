import { useHistory } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import { getComponent } from 'shared/components/quiz';
import { useQuiz } from 'shared/hooks/quizzes';
import { useVocabulary } from 'shared/hooks/vocabularies';

import VocabularyQuizEmptyState from './VocabularyQuizEmptyState';
import VocabularyQuizStatistic from './VocabularyQuizStatistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const history = useHistory();

    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);

    const { Component: VocabularyQuizItem, getData } = getComponent(match.params.quiz);
    const lexemes = getData(vocabulary?.lexemes);

    const {
        numberOfItems,
        currentItem,
        currentItemIndex,
        updateStatus,
        continueQuiz,
        statistic,
        showStatistic
    } = useQuiz(lexemes, actions.updateLexemeStatus);

    const handleBack = () => history.goBack();

    if (!vocabulary) return <LoadingIndicator />;

    if (!VocabularyQuizItem) throw new Error('No component for quiz');

    return (
        <div className={styles.root}>
            {showStatistic ?
                <VocabularyQuizStatistic
                    statistic={statistic}
                    onContinue={continueQuiz}
                    onBack={handleBack}
                /> :
                (currentItem ?
                    <VocabularyQuizItem
                        item={currentItem}
                        itemIndex={currentItemIndex}
                        numberOfItems={numberOfItems}
                        updateStatus={updateStatus}
                    /> :
                    <VocabularyQuizEmptyState onAction={handleBack} />
                )
            }
        </div>
    );
}