import LoadingIndicator from 'shared/components/loading-indicator';
import Vocabularies from 'shared/components/vocabularies';
import { useUser } from 'shared/hooks/user';
import { useVocabularies, useVocabulary } from 'shared/hooks/vocabularies';

export default function VocabulariesPage() {
    const [user] = useUser();
    const [userVocabulary] = useVocabulary('my');
    const [vocabularies, actions] = useVocabularies();

    if (!vocabularies || !userVocabulary) return <LoadingIndicator />;

    return (
        <Vocabularies
            user={user}
            vocabularies={[userVocabulary, ...vocabularies]}
            actions={actions}
        />
    );
}