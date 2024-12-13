import Vocabulary from 'shared/components/vocabulary';
import { useDictionary } from 'shared/hooks/dictionary';
import { useUser } from 'shared/hooks/user';

export default function VocabularyPage() {
    const [user] = useUser();
    const [dictionary] = useDictionary();

    return (
        <Vocabulary user={user} vocabulary={dictionary} />
    );
}