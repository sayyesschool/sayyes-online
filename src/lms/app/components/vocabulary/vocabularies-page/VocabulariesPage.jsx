
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useVocabularies } from 'shared/hooks/vocabularies';

import VocabularyGrid from 'lms/components/vocabulary/vocabulary-grid';

export default function VocabulariesPage() {
    const [vocabularies] = useVocabularies();

    if (!vocabularies) return <LoadingIndicator />;

    return (
        <Page className="VocabulariesPage">
            <Page.Content>
                <Page.Header title="Словари"/>
                <VocabularyGrid vocabularies={vocabularies} />
            </Page.Content>
        </Page>
    );
}