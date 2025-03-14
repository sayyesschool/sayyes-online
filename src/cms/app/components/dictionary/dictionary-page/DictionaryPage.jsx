import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useDictionary } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';
import { getWordEnding } from 'shared/utils/format';

import DictionaryLexemes from 'cms/components/dictionary/dictionary-lexemes';

export default function DictionaryPage() {
    const [user] = useUser();
    const [dictionary] = useDictionary();

    if (!dictionary) return <LoadingIndicator fullscreen />;

    const { title, numberOfLexemes } = dictionary;
    const description = `${numberOfLexemes} ${getWordEnding('слов', numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Page layout="narrow">
            <Page.Header
                title={title}
                description={description}
            />

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <DictionaryLexemes
                        user={user}
                        dictionary={dictionary}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}