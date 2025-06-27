import { useCallback, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
    Link,
    Menu,
    Surface,
    Text
} from 'shared/ui-components';

import { useActions } from 'crm/hooks/store';

import styles from './TaskComment.module.scss';

export default function TaskComment({
    user,
    comment,
    editing = false,
    toggleCommenting,
    onSave,
    onDelete,
    readOnly = false
}) {
    const editorRef = useRef();
    const { showNotification } = useActions('notification');
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

        onSave(data, comment?.id);

        toggleEditing(false);
        toggleCommenting?.(false);
    }, [comment?.id, onSave, showNotification, toggleCommenting, toggleEditing]);

    const handleCancel = useCallback(() => {
        toggleEditing(false);
        toggleCommenting?.(false);
    }, [toggleCommenting, toggleEditing]);

    const handleDelete = useCallback(() => {
        onDelete(comment.id);
    }, [comment, onDelete]);

    return isEditing ? (
        <Box>
            <Surface variant="outlined" className={styles.editor}>
                <ContentEditor ref={editorRef} content={comment?.content ?? ''} />
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
        <Surface variant="outlined" className={styles.root}>
            <Box className={styles.header}>
                <Avatar src="https://placehold.co/50" />

                <Box className={styles.meta}>
                    <Link
                        component={RouterLink}
                        fontWeight="lg"
                        to={`/managers/${author.id}`}
                    >
                        {/* {user.id === author.id ? 'Я' : author.fullname} */}
                        {author.fullname}
                    </Link>

                    <Text
                        fontWeight="lg"
                        content={datetime(comment.createdAt)
                            .tz('Europe/Moscow')
                            .format('D MMM YYYY в H:mm')}
                    />
                </Box>

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