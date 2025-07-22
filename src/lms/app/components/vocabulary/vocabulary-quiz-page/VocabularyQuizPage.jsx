import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useVocabulary } from 'shared/hooks/vocabularies';

import VocabularyQuiz from 'lms/components/vocabulary/vocabulary-quiz';

import styles from './VocabularyQuizPage.module.scss';

export default function VocabularyQuizPage({ match }) {
    const history = useHistory();

    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);

    const handleBack = useCallback(() => {
        history.push(`/vocabularies/${vocabulary.id}`);
    }, [history, vocabulary?.id]);

    if (!vocabulary) return <LoadingIndicator />;

    return (
        <Page className={styles.root}>
            <VocabularyQuiz
                vocabulary={vocabulary}
                quizType={match.params.quiz}
                updateLexemeStatus={actions.updateLexemeStatus}
                onBack={handleBack}
            />
        </Page>
    );
}