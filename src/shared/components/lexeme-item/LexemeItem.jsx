import { useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    user,
    lexeme,
    readOnly,
    selectedLexemeIds,
    onView,
    onApprove,
    onUnapprove,
    onEdit,
    onSelect,
    onDelete,
    onStatusUpdate
}) {
    const { id, value, translation, status } = lexeme;
    const isCreatorLexeme = lexeme.createdBy === user.id;
    const showDeleteBtn = (user.isEditor && isCreatorLexeme) || user.isLearner;

    const handleCheckboxChange = useCallback(() => {
        return onSelect(id);
    }, [id, onSelect]);

    const handleContentClick = useCallback(() => {
        return onView(id);
    }, [id, onView]);

    const handleStatusChange = useCallback(status => {
        onStatusUpdate(id, status);
    }, [id, onStatusUpdate]);

    const actionButtons = [

        onApprove && {
            icon: 'verified',
            title: 'Утвердить слово',
            handler: () => onApprove(id)
        },
        onUnapprove && {
            icon: 'clear',
            title: 'Архивировать слово',
            handler: () => onUnapprove(id)
        },
        {
            icon: 'edit',
            title: 'Редактировать слово',
            handler: () => onEdit(id)
        },
        showDeleteBtn && onDelete && {
            icon: 'delete',
            title: 'Удалить слово',
            handler: () => onDelete(id)
        }
    ].filter(Boolean);

    return (
        <ListItem className={styles.root}>
            <Checkbox
                checked={selectedLexemeIds?.includes(id)}
                onChange={handleCheckboxChange}
            />

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
                {onStatusUpdate && <LexemeStatus
                    level={status}
                    readOnly={readOnly}
                    onChange={handleStatusChange}
                />}

                {/* {lexeme.audio &&
                    <IconButton
                        icon="volume_up"
                        title="Воспроизвести слово"
                        onClick={() => console.log('audio')}
                    />
                } */}

                {actionButtons.map(({ title, icon, handler }, index) => (
                    <IconButton
                        key={index}
                        title={title}
                        icon={icon}
                        onClick={handler}
                    />
                ))}
            </div>
        </ListItem>
    );
}