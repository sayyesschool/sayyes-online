import { useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    lexeme,
    readOnly,
    onView,
    onEdit,
    onSelect,
    onDelete,
    onStatusUpdate
}) {
    const { id, value, translation, status } = lexeme;

    const handleCheckboxChange = useCallback(() => {
        return onSelect(id);
    }, [id, onSelect]);

    const handleContentClick = useCallback(() => {
        return onView(id);
    }, [id, onView]);

    const handleEditButtonClick = useCallback(() => {
        return onEdit(id);
    }, [id, onEdit]);

    const handleDeleteButtonClick = useCallback(() => {
        return onDelete(id);
    }, [id, onDelete]);

    const handleStatusChange = useCallback(status => {
        return onStatusUpdate(id, status);
    }, [id, onStatusUpdate]);

    return (
        <ListItem className={styles.root}>
            {/* Временно отключили */}
            {/* <Checkbox
                checked={false}
                onChange={handleCheckboxChange}
            /> */}

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
                <LexemeStatus
                    level={status}
                    readOnly={readOnly}
                    onChange={handleStatusChange}
                />

                {lexeme.audio &&
                    <IconButton
                        icon="volume_up"
                        title="Воспроизвести слово"
                        onClick={() => console.log('audio')}
                    />
                }

                {!readOnly && (
                    <>
                        <IconButton
                            icon="edit"
                            title="Редактировать слово"
                            onClick={handleEditButtonClick}
                        />

                        <IconButton
                            icon="delete"
                            title="Удалить слово"
                            onClick={handleDeleteButtonClick}
                        />
                    </>
                )}
            </div>
        </ListItem>
    );
}