
import LoadingIndicator from 'shared/components/loading-indicator';
import { useVocabulary, useVocabularyQuiz } from 'shared/hooks/vocabularies';
import { Button } from 'shared/ui-components';

import VocabularyFlipCards from 'lms/components/vocabulary/vocabulary-flip-cards';

export default function VocabularyQuiz({ match }) {
    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);
    const {
        isQuizAvaiable,
        lexeme,
        updateStatus,
        continueGame,
        statistic,
        showStatistic
    } = useVocabularyQuiz(vocabulary?.lexemes, actions.updateLexemeStatus);

    if (!vocabulary) return <LoadingIndicator />;

    if (isQuizAvaiable) {
        return <h1>Для запуска тренажёра, необходимо иметь неизученные слова</h1>;
    }

    if (showStatistic) {
        return (
            <div>
                <p>Статистика</p>

                <ul>
                    {statistic.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.value} - oldStatus: {item.oldStatus} - newStatus:{' '}
                                {item.newStatus}
                            </li>
                        );
                    })}
                </ul>

                <Button content="Продолжить" onClick={continueGame} />
                <Button content="Вернуться в словарь" />
            </div>
        );
    }

    return (
        <VocabularyFlipCards lexeme={lexeme} updateStatus={updateStatus} />
    );
}