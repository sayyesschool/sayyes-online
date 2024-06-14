import LoadingIndicator from 'shared/components/loading-indicator';
import { useVocabulary, useVocabularyQuiz } from 'shared/hooks/vocabularies';

import VocabularyQuizStatistic from 'lms/components/vocabulary/vocabulary-quiz-statistic';

import { trainerComponents } from './trainer-components';
import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const { vocabulary, trainer } = match.params;
    const [vocabularyData, actions] = useVocabulary(vocabulary);
    const { component: TrainerComponent, dataParser } = trainerComponents[trainer] || {};
    const parsedLexemes = dataParser ? dataParser(vocabularyData?.lexemes) : vocabularyData?.lexemes;
    const {
        isQuizNotAvaiable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    } = useVocabularyQuiz(parsedLexemes, actions.updateLexemeStatus);

    if (!vocabularyData) return <LoadingIndicator />;

    const renderContent = () => {
        if (!TrainerComponent) {
            return <h1>Неправильный тренажер</h1>;
        }

        if (isQuizNotAvaiable) {
            return <h1>Для запуска тренажёра, необходимо иметь неизученные слова</h1>;
        }

        if (showStatistic) {
            return (
                <VocabularyQuizStatistic
                    statistic={statistic}
                    continueGame={continueGame}
                />
            );
        }

        return <TrainerComponent lexeme={lexeme} updateStatus={updateStatus} />;
    };

    return <div className={styles.root}>{renderContent()}</div>;
}