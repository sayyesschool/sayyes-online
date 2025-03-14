import { useCallback } from 'react';

import { Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';
import { stopPropagation } from 'shared/utils/dom';

import styles from './LexemesSearchResultItem.module.scss';

export default function LexemesSearchResultItem({
    result,
    action,
    onSelect
}) {
    const handleClick = useCallback(e => {
        onSelect(result.data);
    }, [onSelect, result.data]);

    const className = cn(
        styles.root,
        result.disabled && styles.disabled
    );

    return (
        <div
            className={className}
            onClick={handleClick}
        >
            <div className={styles.text}>
                <Text color="primary">{result.value}</Text>
                <Text content="-" />
                <Text>{result.translation}</Text>
            </div>

            <div className={styles.action} onClick={stopPropagation}>
                {action}
            </div>
        </div>
    );
}