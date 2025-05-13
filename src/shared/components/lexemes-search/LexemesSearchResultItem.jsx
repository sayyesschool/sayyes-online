import { useCallback } from 'react';

import { Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';
import { stopPropagation } from 'shared/utils/dom';

import styles from './LexemesSearchResultItem.module.scss';

export default function LexemesSearchResultItem({
    result,
    action,
    onSelect,
    ...props
}) {
    const lexeme = result.data;

    const handleClick = useCallback(e => {
        onSelect?.(lexeme);
    }, [onSelect, lexeme]);

    const className = cn(
        styles.root,
        result.disabled && styles.disabled
    );

    return (
        <div
            className={className}
            {...props}
        >
            <div className={styles.text} onClick={handleClick}>
                <Text type="body-md" color="primary">{lexeme.value}</Text>
                <Text type="body-sm">{lexeme.translation}</Text>
            </div>

            <div className={styles.action} onClick={stopPropagation}>
                {action}
            </div>
        </div>
    );
}