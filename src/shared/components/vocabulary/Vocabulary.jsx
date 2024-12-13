import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { getWordEnding } from 'shared/utils/format';

import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';

export default function Vocabulary({ user, vocabulary, headerActions }) {
    // TODO: может эту проверку стоит убрать отсюда?
    if (!vocabulary) return <LoadingIndicator />;

    const { title, numberOfLexemes } = vocabulary;
    const description = `${numberOfLexemes} ${getWordEnding('слов', numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Page layout="narrow">
            <Page.Header
                title={title}
                description={description}
                actions={headerActions}
            />

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <VocabularyLexemes
                        vocabulary={vocabulary}
                        user={user}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}