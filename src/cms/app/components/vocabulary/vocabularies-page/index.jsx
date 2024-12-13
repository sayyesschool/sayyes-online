import LoadingIndicator from 'shared/components/loading-indicator';
import Vocabularies from 'shared/components/vocabularies';
import { useDictionary } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';

export default function VocabulariesPage() {
    const [user] = useUser();
    const [dictionary] = useDictionary();

    if (!dictionary) return <LoadingIndicator />;

    return <Vocabularies user={user} vocabularies={[dictionary]} />;
}