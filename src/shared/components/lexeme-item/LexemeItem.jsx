import { isValidElement, useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    lexeme,
    selectedLexemeIds,
    actionButtons,
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
                    checked={selectedLexemeIds?.includes(id)}
                    onChange={handleCheckboxChange}
                />
            )}

            <div
                className={styles.content}
                onClick={handleContentClick}
            >
                <Text
                    className={styles.value} color="primary"
                    content={value}
                />

                <Text content="—" />
                <Text className={styles.translation} content={translation} />
            </div>

            <div className={styles.actions}>
                {actionButtons.map((button, index) => {
                    if (isValidElement(button)) return button;

                    return (
                        <IconButton
                            key={index}
                            title={button.title}
                            icon={button.icon}
                            onClick={button.handler}
                        />
                    );
                })}
            </div>
        </ListItem>
    );
}