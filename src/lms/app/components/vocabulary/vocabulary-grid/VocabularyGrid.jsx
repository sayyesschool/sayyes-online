
import { Link } from 'react-router-dom';

import Grid from '@mui/joy/Grid';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';

export default function VocabularyGrid({ vocabularies }) {
    return (
        <Grid
            className="VocabularyGrid"
            direction="row"
            justifyContent="space-start"
            alignItems="flex-start"
            gap="10px"
            container
        >
            {vocabularies.map(({ id, title, description, imageUrl, numberOfLexemes, coursePath }) =>
                <VocabularyCard
                    key={id}
                    as={Link}
                    imageUrl={imageUrl}
                    title={title}
                    subtitle={description}
                    numberOfLexemes={numberOfLexemes}
                    coursePath={coursePath}
                    to={{
                        pathname: `vocabulary/${id}`
                    }}
                />
            )}
        </Grid>
    );
};