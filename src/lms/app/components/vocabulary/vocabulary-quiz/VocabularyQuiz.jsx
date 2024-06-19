import { useHistory } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import { getComponent } from 'shared/components/quiz';
import { useQuiz } from 'shared/hooks/quizzes';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Button } from 'shared/ui-components';

import VocabularyQuizStatistic from './VocabularyQuizStatistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const history = useHistory();

    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);

    const { Component, getData } = getComponent(match.params.quiz);
    const lexemes = getData(vocabulary?.lexemes);

    const {
        numberOfItems,
        currentItem,
        currentItemIndex,
        updateStatus,
        continueQuiz,
        statistic,
        showStatistic,
        isQuizNotAvailable
    } = useQuiz(lexemes, actions.updateLexemeStatus);

    const handleBack = () => history.goBack();

    if (!Component) throw new Error('No component for quiz');

    if (!vocabulary) return <LoadingIndicator />;

    if (isQuizNotAvailable) return (
        <div className={styles.root}>
            <h1>Для запуска тренажёра, необходимо иметь неизученные слова</h1>

            <Button
                content="Вернуться в словарь"
                onClick={handleBack}
            />
        </div>
    );

    return (
        <div className={styles.root}>
            {showStatistic ?
                <VocabularyQuizStatistic
                    statistic={statistic}
                    onContinue={continueQuiz}
                    onBack={handleBack}
                /> :
                <Component
                    item={currentItem}
                    itemIndex={currentItemIndex}
                    numberOfItems={numberOfItems}
                    updateStatus={updateStatus}
                />
            }
        </div>
    );
}