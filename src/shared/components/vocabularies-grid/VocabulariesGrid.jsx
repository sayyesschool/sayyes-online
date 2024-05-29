import VocabularyCard from 'shared/components/vocabulary-card';
import { Grid } from 'shared/ui-components';

export default function VocabulariesGrid({ vocabularies, onDeleteVocabulary, setCurrentVocabulary }) {
    return (
        <Grid
            className="VocabularyGrid"
            direction="row"
            justifyContent="space-start"
            alignItems="flex-start"
            gap="10px"
            container
        >
            {vocabularies.map(vocabulary =>
                <VocabularyCard
                    key={vocabulary.id}
                    vocabulary={vocabulary}
                    setCurrentVocabulary={setCurrentVocabulary}
                    onDeleteVocabulary={onDeleteVocabulary}
                />
            )}
        </Grid>
    );
}