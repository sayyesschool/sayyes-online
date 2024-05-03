import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useVocabularies } from 'shared/hooks/vocabularies';

import VocabulariesGrid from 'lms/components/vocabulary/vocabularies-grid';

export default function VocabulariesPage() {
    const [vocabularies] = useVocabularies();

    if (!vocabularies) return <LoadingIndicator />;

    return (
        <Page className="VocabulariesPage">
            <Page.Header title="Словари"/>

            <Page.Content>
                <VocabulariesGrid vocabularies={vocabularies} />
            </Page.Content>
        </Page>
    );
}