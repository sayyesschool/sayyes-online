import { Link } from 'react-router-dom';

import { Grid } from 'shared/ui-components';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';

export default function VocabulariesGrid({ vocabularies }) {
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
                    as={Link}
                    to={`vocabulary/${vocabulary.id}`}
                    vocabulary={vocabulary}
                />
            )}
        </Grid>
    );
}