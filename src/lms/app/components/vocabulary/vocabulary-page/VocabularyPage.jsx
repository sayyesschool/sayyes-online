import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Button, Menu } from 'shared/ui-components';
import { getWordEnding } from 'shared/utils/format';

import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';

import styles from './VocabularyPage.module.scss';

export default function VocabularyPage({ match }) {
    const [vocabulary] = useVocabulary(match.params.vocabulary);

    if (!vocabulary) return <LoadingIndicator />;

    const { title, numberOfLexemes } = vocabulary;
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
                            <Button
                                icon="exercise"
                                color="primary"
                                content="Тренировка"
                                variant="soft"
                            />
                        }
                        items={[{
                            key: 'flip-cards',
                            as: 'a',
                            href: `${vocabulary.id}/quiz/flip-cards`,
                            icon: 'autorenew',
                            content: 'Flip Cards'
                        },
                        {
                            key: 'true-false',
                            as: 'a',
                            href: `${vocabulary.id}/quiz/true-false`,
                            icon: 'question_mark',
                            content: 'True False'
                        }]}
                    />
                ]}
            />

            <Page.Content className={styles.content}>
                <Page.Section variant="outlined" compact>
                    <VocabularyLexemes
                        vocabulary={vocabulary}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}