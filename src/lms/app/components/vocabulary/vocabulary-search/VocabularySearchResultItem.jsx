import { useCallback } from 'react';

import { IconButton, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';
import { stopPropagation } from 'shared/utils/dom';

import styles from './VocabularySearchResultItem.module.scss';

export default function VocabularySearchResultItem({
    result,
    lexemes,
    onAddLexeme
}) {
    const handleAddButtonClick = useCallback(e => {
        stopPropagation(e);

        return onAddLexeme({ lexemeId: result.id });
    }, [result.id, onAddLexeme]);

    const className = cn(
        styles.root,
        result.disabled && styles.disabled
    );

    const isLexemePresent = lexemes.find(l => l.value === result.value);

    return (
        <div
            className={className}
            onClick={stopPropagation}
        >
            <div className={styles.text}>
                <Text color="primary">{result.value}</Text>
                <Text content="-" />
                <Text>{result.translation}</Text>
            </div>

            <IconButton
                icon={isLexemePresent ? 'check' : 'add'}
                title={isLexemePresent ? 'Слово уже добавлено' : 'Добавить слово'}
                variant="soft"
                disabled={isLexemePresent}
                onClick={handleAddButtonClick}
            />
        </div>
    );
}