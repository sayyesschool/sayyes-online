import { Grid } from 'shared/ui-components';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';

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