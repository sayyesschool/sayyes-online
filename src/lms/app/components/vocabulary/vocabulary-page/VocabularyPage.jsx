import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { MenuButton } from 'shared/ui-components';
import { IconButton } from 'shared/ui-components';
import { getWordEnding } from 'shared/utils/format';

import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';

import styles from './VocabularyPage.module.scss';

export default function VocabularyPage({ match }) {
    const [vocabulary] = useVocabulary(match.params.vocabulary);

    if (!vocabulary) return <LoadingIndicator />;

    const { title, numberOfLexemes } = vocabulary;
    const pageTitle = `${title} (${numberOfLexemes})`;
    const pageDescription = `${vocabulary.numberOfLexemes} ${getWordEnding('слов', vocabulary.numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Page
            className={styles.root}
            // title={pageTitle}
        >
            <Page.Header
                title={vocabulary.title}
                description={pageDescription}
                actions={[{
                    key: 'flip-cards',
                    icon: 'autorenew',
                    title: 'Flip-Cards',
                    as: 'a',
                    href: `${vocabulary.id}/quiz/flip-cards`
                },
                {
                    key: 'true-false',
                    icon: 'question_mark',
                    title: 'True-False',
                    as: 'a',
                    href: `${vocabulary.id}/quiz/true-false`
                }]}
            />

            <Page.Content>
                <Page.Section compact>
                    <VocabularyLexemes
                        vocabulary={vocabulary}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}