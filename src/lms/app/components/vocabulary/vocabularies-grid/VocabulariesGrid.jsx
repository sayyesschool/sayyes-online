import { Grid } from 'shared/ui-components';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';

import styles from './VocabulariesGrid.module.scss';

export default function VocabulariesGrid({
    vocabularies,
    onEditVocabulary,
    onDeleteVocabulary
}) {
    return (
        <Grid className={styles.root} gap="medium">
            {vocabularies.map(vocabulary =>
                <Grid.Item
                    key={vocabulary.id}
                    className={styles.item}
                >
                    <VocabularyCard
                        vocabulary={vocabulary}
                        onEditVocabulary={onEditVocabulary}
                        onDeleteVocabulary={onDeleteVocabulary}
                    />
                </Grid.Item>
            )}
        </Grid>
    );
}