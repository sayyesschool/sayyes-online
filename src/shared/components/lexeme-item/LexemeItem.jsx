import { useCallback } from 'react';

import { Checkbox, IconButton, ListItem, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeItem.module.scss';

export default function LexemeItem({
    inline,
    user,
    lexeme,
    selectedLexemeIds,
    onView,
    onUnapprove,
    onEdit,
    onSelect,
    onDelete,
    onStatusUpdate
}) {
    const { id: userId, isLearner, isManager, isTeacher } = user;
    const { id, value, translation, status, createdBy } = lexeme;
    const isCreatorLexeme = createdBy === userId;
    const managerIsCreator = isManager && isCreatorLexeme;
    const teacherIsNotInline = isTeacher && !inline;
    const isInlineTeacher = isTeacher && inline;
    const isNotInlineTeacher = !isInlineTeacher;
    const showDeleteBtn = onDelete && (isLearner || managerIsCreator || teacherIsNotInline);
    const showEditBtn = isNotInlineTeacher;

    const handleCheckboxChange = useCallback(() => {
        return onSelect(id);
    }, [id, onSelect]);

    const handleContentClick = useCallback(() => {
        return onView(lexeme);
    }, [lexeme, onView]);

    const handleStatusChange = useCallback(status => {
        onStatusUpdate(id, status);
    }, [id, onStatusUpdate]);

    const actionButtons = [
        showEditBtn && {
            icon: user.Manager ? 'verified' : 'edit',
            title: 'Редактировать слово',
            handler: () => onEdit(lexeme)
        },
        onUnapprove && {
            icon: 'clear',
            title: 'Архивировать слово',
            handler: () => onUnapprove(id)
        },
        showDeleteBtn && {
            icon: 'delete',
            title: 'Удалить слово',
            handler: () => onDelete(id)
        }
    ].filter(Boolean);

    return (
        <ListItem className={styles.root}>
            {isManager && (
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
                {onStatusUpdate && (
                    <LexemeStatus
                        level={status}
                        readOnly={isInlineTeacher}
                        onChange={handleStatusChange}
                    />
                )}

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