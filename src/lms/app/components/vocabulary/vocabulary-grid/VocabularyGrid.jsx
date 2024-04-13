
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
            {vocabularies?.map(({ id, url, title, description, imageUrl, itemsCount, coursePath }) =>
                <VocabularyCard
                    key={id}
                    as={Link}
                    imageUrl={imageUrl}
                    title={title}
                    subtitle={description}
                    itemsCount={itemsCount}
                    coursePath={coursePath}
                    to={{
                        pathname: url
                    }}
                />
            )}
        </Grid>
    );
};

