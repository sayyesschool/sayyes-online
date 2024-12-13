import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Vocabulary from 'shared/components/vocabulary';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Button, Menu } from 'shared/ui-components';

export default function VocabularyPage({ match }) {
    const [user] = useUser();
    const [vocabulary] = useVocabulary(match.params.vocabulary);

    if (!vocabulary) return <LoadingIndicator />;

    const { id, numberOfLexemes } = vocabulary;

    const headerActions = [
        <Menu
            key="menu"
            trigger={
                <Button
                    icon="exercise"
                    color="primary"
                    content="Тренировка"
                    variant="soft"
                />
            }
            disabled={numberOfLexemes === 0}
            items={[
                {
                    key: 'flip-cards',
                    as: Link,
                    to: `${id}/quiz/flip-card`,
                    icon: 'autorenew',
                    content: 'Flip Cards'
                },
                {
                    key: 'true-false',
                    as: Link,
                    to: `${id}/quiz/true-false`,
                    icon: 'question_mark',
                    content: 'True False'
                },
                {
                    key: 'choose-correct',
                    as: Link,
                    to: `${id}/quiz/choose-correct`,
                    icon: 'gesture_select',
                    content: 'Choose Correct'
                },
                {
                    key: 'match',
                    as: Link,
                    to: `${id}/quiz/match`,
                    icon: 'swap_vert',
                    content: 'Match'
                },
                {
                    key: 'scrabble',
                    as: Link,
                    to: `${id}/quiz/scrabble`,
                    icon: 'match_word',
                    content: 'Scrabble'
                }
            ]}
        />
    ];

    return (
        <Vocabulary
            user={user}
            vocabulary={vocabulary}
            headerActions={headerActions}
        />
    );
}