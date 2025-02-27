import VocabularyCard from 'shared/components/vocabulary-card';
import { Grid } from 'shared/ui-components';

import styles from './VocabulariesGrid.module.scss';

export default function VocabulariesGrid({
    href,
    vocabularies,
    onEditVocabulary,
    onDeleteVocabulary
}) {
    return (
        <Grid className={styles.root} gap="medium">
            {vocabularies.map(vocabulary =>
                <Grid.Item
                    key={vocabulary.id}
                    xs={3}
                >
                    <VocabularyCard
                        href={`${href}/${vocabulary.id}`}
                        vocabulary={vocabulary}
                        onEditVocabulary={onEditVocabulary}
                        onDeleteVocabulary={onDeleteVocabulary}
                    />
                </Grid.Item>
            )}
        </Grid>
    );
}