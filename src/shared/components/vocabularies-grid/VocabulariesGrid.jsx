import VocabularyCard from 'shared/components/vocabulary-card';
import { useMediaQuery } from 'shared/hooks/screen';
import { Grid } from 'shared/ui-components';

import styles from './VocabulariesGrid.module.scss';

export default function VocabulariesGrid({
    href,
    vocabularies,
    onEditVocabulary,
    onDeleteVocabulary
}) {
    const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
    const columns = isMobile ? 'auto' : 3;

    return (
        <Grid
            className={styles.root}
            columns={columns}
            gap="medium"
        >
            {vocabularies.map(vocabulary =>
                <Grid.Item
                    key={vocabulary.id}
                    className={styles.item}
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