import { useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    lexeme,
    userId,
    onView,
    onEdit,
    onSelect,
    onDelete,
    onStatusUpdate
}) {
    const handleCheckboxChange = useCallback(() => {
        return onSelect(lexeme.id);
    }, [lexeme, onSelect]);

    const handleContentClick = useCallback(() => {
        return onView(lexeme.id);
    }, [lexeme, onView]);

    const handleEditButtonClick = useCallback(() => {
        return onEdit(lexeme.id);
    }, [lexeme, onEdit]);

    const handleDeleteButtonClick = useCallback(() => {
        return onDelete(lexeme.id);
    }, [lexeme, onDelete]);

    const handleStatusChange = useCallback(status => {
        return onStatusUpdate(lexeme.id, status);
    }, [lexeme, onStatusUpdate]);

    const { value, translations, data } = lexeme;
    const translationsString = translations.join(', ');
    // TODO: Move to the api ???
    const isNotAuthor = userId !== lexeme?.createdBy;

    return (
        <ListItem className={styles.root}>
            <Checkbox
                checked={false}
                onChange={handleCheckboxChange}
            />

            <div
                className={styles.content}
                onClick={handleContentClick}
            >
                <Text className={styles.value} color="primary" content={value} />
                <Text content="—" />
                <Text className={styles.translations}>{translationsString}</Text>
            </div>

            <div className={styles.actions}>
                <LexemeStatus
                    level={data?.status}
                    onChange={handleStatusChange}
                />

                {lexeme.audio &&
                    <IconButton
                        icon="volume_up"
                        title="Воспроизвести слово"
                        onClick={() => console.log('audio')}
                    />
                }

                <IconButton
                    icon="edit"
                    title="Редактировать слово"
                    disabled={isNotAuthor}
                    onClick={handleEditButtonClick}
                />

                <IconButton
                    icon="delete"
                    title="Удалить слово"
                    disabled={isNotAuthor}
                    onClick={handleDeleteButtonClick}
                />
            </div>
        </ListItem>
    );
}