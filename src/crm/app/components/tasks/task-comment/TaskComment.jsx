import { useCallback, useRef } from 'react';

import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import { useBoolean } from 'shared/hooks/state';
import datetime from 'shared/libs/datetime';
import {
    Avatar,
    Box,
    Button,
    Flex,
    IconButton,
    Menu,
    Surface,
    Text
} from 'shared/ui-components';

import { useActions } from 'crm/hooks/store';

import styles from './TaskComment.module.scss';

export default function TaskComment({
    comment,
    user,
    editing = false,
    readOnly = false,
    size,
    variant,
    onSave,
    onCancel,
    onDelete
}) {
    const { showNotification } = useActions('notification');

    const editorRef = useRef();

    const [isEditing, toggleEditing] = useBoolean(editing);

    const author = comment?.author || user;

    const handleSave = useCallback(() => {
        const data = editorRef.current?.getData();

        if (!data) {
            showNotification({
                text: 'Комментарий не может быть пустым',
                type: 'error'
            });

            return;
        }

        toggleEditing(false);
        onSave(comment?.id, data);
    }, [comment?.id, onSave, showNotification, toggleEditing]);

    const handleCancel = useCallback(() => {
        toggleEditing(false);
        onCancel?.(false);
    }, [toggleEditing, onCancel]);

    const handleDelete = useCallback(() => {
        onDelete(comment.id);
    }, [comment, onDelete]);

    return isEditing ? (
        <Box>
            <Surface variant={variant} className={styles.editor}>
                <ContentEditor
                    ref={editorRef}
                    content={comment?.content ?? ''}
                    simple
                />
            </Surface>

            <Flex justifyContent="space-between">
                <Button
                    variant="outlined" content="Отменить"
                    onClick={handleCancel}
                />

                <Button content="Сохранить" onClick={handleSave} />
            </Flex>
        </Box>
    ) : (
        <Surface variant={variant} className={styles.root}>
            <Box className={styles.header}>
                <Flex
                    align="center"
                    gap="xs"
                >
                    <Avatar
                        content={comment.author?.initials}
                        size={size}
                    />

                    <Text
                        content={datetime(comment.createdAt)
                            .tz('Europe/Moscow')
                            .format('D MMM YYYY в H:mm')}
                        type="body-xs"
                    />
                </Flex>

                {user.id === author.id && !readOnly && (
                    <Menu
                        key="menu"
                        trigger={<IconButton icon="more_vert" variant="outlined" />}
                        items={[
                            {
                                key: 'edit',
                                icon: 'edit',
                                content: 'Редактировать',
                                onClick: toggleEditing
                            },
                            {
                                key: 'delete',
                                icon: 'delete',
                                content: 'Удалить',
                                onClick: handleDelete
                            }
                        ]}
                    />
                )}
            </Box>

            <Content content={comment.content} html />
        </Surface>
    );
}