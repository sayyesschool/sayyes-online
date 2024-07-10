import { Grid } from 'shared/ui-components';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';

import styles from './VocabulariesGrid.module.scss';

export default function VocabulariesGrid({
    vocabularies,
    onDeleteVocabulary,
    setCurrentVocabulary
}) {
    return (
        <Grid className={styles.root}>
            {vocabularies.map(vocabulary =>
                <Grid.Item key={vocabulary.id} xs={3}>
                    <VocabularyCard
                        vocabulary={vocabulary}
                        setCurrentVocabulary={setCurrentVocabulary}
                        onDeleteVocabulary={onDeleteVocabulary}
                    />
                </Grid.Item>
            )}
        </Grid>
    );
}