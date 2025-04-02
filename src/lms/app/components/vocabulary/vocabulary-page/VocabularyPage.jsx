import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useIsMobile } from 'shared/hooks/screen';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Button, IconButton, Menu } from 'shared/ui-components';
import { getWordEnding } from 'shared/utils/format';

import Vocabulary from 'lms/components/vocabulary/vocabulary';

import styles from './VocabularyPage.module.scss';

export default function VocabularyPage({ match }) {
    const [user] = useUser();
    const [vocabulary] = useVocabulary(match.params.vocabulary);
    const isMobile = useIsMobile();

    if (!vocabulary) return <LoadingIndicator />;

    const { id, title, numberOfLexemes } = vocabulary;
    const description = `${numberOfLexemes} ${getWordEnding('слов', numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Page
            className={styles.root}
            layout="narrow"
            // title={`${title} (${numberOfLexemes})`}
        >
            <Page.Header
                className={styles.header}
                title={title}
                description={description}
                actions={[
                    <Menu
                        key="menu"
                        trigger={
                            isMobile ? (
                                <IconButton icon="exercise" variant="outlined" />
                            ) : (
                                <Button
                                    icon="exercise"
                                    color="primary"
                                    content="Тренировка"
                                    variant="soft"
                                />)
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
                ]}
            />

            <Page.Content className={styles.content}>
                <Page.Section variant="outlined" compact>
                    <Vocabulary
                        vocabulary={vocabulary}
                        learnerId={user.id}
                        userId={user.id}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}