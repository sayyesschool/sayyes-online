import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useDictionary } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';
import { getWordEnding } from 'shared/utils/format';

import Dictionary from 'cms/components/dictionary/dictionary/Dictionary'; // Import from file to avoid circular dependency

export default function DictionaryPage() {
    const [dictionary] = useDictionary();
    const [user] = useUser();

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
                    <Dictionary
                        dictionary={dictionary}
                        user={user}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}