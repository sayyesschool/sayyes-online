import { useCallback } from 'react';

import { IconButton, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';
import { stopPropagation } from 'shared/utils/dom';

import styles from './VocabularySearchResultItem.module.scss';

export default function VocabularySearchResultItem({
    result,
    addLexeme
}) {
    const handleAddButtonClick = useCallback(e => {
        stopPropagation(e);

        return addLexeme({ lexemeId: result.id });
    }, [addLexeme, result.id]);

    return (
        <div
            className={cn(styles.root, styles.disabled)}
            onClick={stopPropagation}
        >
            <div className={styles.text}>
                <Text color="primary">{result.value}</Text>
                <Text content="-" />
                <Text>{result.translation}</Text>
            </div>

            <IconButton
                icon="check"
                title="Добавить слово"
                disabled={result.disabled}
                onClick={handleAddButtonClick}
            />
        </div>
    );
}