import { useHistory } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import { useVocabularyQuiz } from 'shared/hooks/quizzes';
import { useVocabulary } from 'shared/hooks/vocabularies';

import VocabularyQuizStatistic from 'lms/components/vocabulary/vocabulary-quiz-statistic';

import { getComponent } from './components';
import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const history = useHistory();

    const [vocabularyData, actions] = useVocabulary(match.vocabulary);

    const { Component, getData } = getComponent(match.trainer);
    const lexemes = getData(vocabularyData?.lexemes);

    const {
        isQuizNotAvailable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    } = useVocabularyQuiz(lexemes, actions.updateLexemeStatus);

    const handleBack = history.goBack();

    if (!vocabularyData) return <LoadingIndicator />;

    if (!Component) return (
        <h1>Неправильный тренажер</h1>
    );

    if (!isQuizNotAvailable) return (
        <h1>Для запуска тренажёра, необходимо иметь неизученные слова</h1>
    );

    return (
        <div className={styles.root}>
            {showStatistic ?
                <VocabularyQuizStatistic
                    statistic={statistic}
                    onContinue={continueGame}
                    onBack={handleBack}
                /> :
                <Component
                    lexeme={lexeme}
                    updateStatus={updateStatus}
                />}
        </div>
    );
}