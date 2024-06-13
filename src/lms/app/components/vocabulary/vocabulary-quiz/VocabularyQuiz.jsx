import LoadingIndicator from 'shared/components/loading-indicator';
import { useVocabulary, useVocabularyQuiz } from 'shared/hooks/vocabularies';

import VocabularyFlipCards from 'lms/components/vocabulary/vocabulary-flip-cards';
import VocabularyQuizStatistic from 'lms/components/vocabulary/vocabulary-quiz-statistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);
    const {
        isQuizNotAvaiable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    } = useVocabularyQuiz(vocabulary?.lexemes, actions.updateLexemeStatus);

    if (!vocabulary) return <LoadingIndicator />;

    const renderContent = () => {
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

        return <VocabularyFlipCards lexeme={lexeme} updateStatus={updateStatus} />;
    };

    return <div className={styles.root}>{renderContent()}</div>;
}