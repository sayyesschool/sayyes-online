import { isValidElement, useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    lexeme,
    actions,
    selected,
    onView,
    onSelect
}) {
    const { id, value, translation } = lexeme;

    const handleCheckboxChange = useCallback(() => {
        return onSelect(id);
    }, [id, onSelect]);

    const handleContentClick = useCallback(() => {
        return onView(lexeme);
    }, [lexeme, onView]);

    return (
        <ListItem className={styles.root}>
            {onSelect && (
                <Checkbox
                    checked={selected}
                    onChange={handleCheckboxChange}
                />
            )}

            <div
                className={styles.content}
                onClick={handleContentClick}
            >
                <Text
                    className={styles.value}
                    content={value}
                    color="primary"
                />

                <Text className={styles.translation} content={translation} />
            </div>

            <div className={styles.actions}>
                {actions.filter(Boolean).map((action, index) => isValidElement(action) ? action : (
                    <IconButton
                        key={index}
                        title={action.title}
                        icon={action.icon}
                        {...action}
                    />
                ))}
            </div>
        </ListItem>
    );
}