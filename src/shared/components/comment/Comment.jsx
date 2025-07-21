import { useCallback, useRef } from 'react';

import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import { useBoolean } from 'shared/hooks/state';
import datetime from 'shared/libs/datetime';
import { Avatar, Button, Flex, Icon, IconButton, Menu, Surface, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './Comment.module.scss';

export default function Comment({
    comment = {},
    user = {},
    size,
    editing = false,
    noAvatar,
    noAuthor,
    noDatetime,
    readOnly,
    onToggle = Function.prototype,
    onSave,
    onDelete
}) {
    const editorRef = useRef();

    const [isEditing, toggleEditing] = useBoolean(editing);

    const handleSave = useCallback(() => {
        toggleEditing(false);
        onSave(comment.id, {
            content: editorRef.current?.getData()
        });
    }, [comment, toggleEditing, onSave]);

    const handleDelete = useCallback(() => {
        onDelete(comment.id);
    }, [comment, onDelete]);

    const handleToggle = useCallback(() => {
        toggleEditing(false);
        onToggle();
    }, [toggleEditing, onToggle]);

    const author = comment.author || user;

    return isEditing ? (
        <div className={cn(styles.root, isEditing && styles.editing)}>
            <Surface className={styles.editor} variant="outlined">
                <ContentEditor
                    ref={editorRef}
                    content={comment?.content ?? ''}
                    simple
                />
            </Surface>

            <div className={styles.actions}>
                <Button
                    type="button"
                    content="Отменить"
                    color="neutral"
                    variant="plain"
                    onClick={handleToggle}
                />

                <Button
                    content="Сохранить"
                    onClick={handleSave}
                />
            </div>
        </div>
    ) : (
        <div className={styles.root}>
            {!noAvatar &&
                <Avatar
                    className={styles.avatar}
                    src={author.imageUrl}
                    content={comment.author?.initials}
                    size={size}
                />
            }

            <div className={styles.main}>
                <Flex gap="xs" align="center">
                    {!noAuthor &&
                        <Text
                            content={author.fullname}
                            type="body-sm"
                        />
                    }

                    {!noAuthor && !noDatetime && <span>·</span>}

                    {!noDatetime &&
                        <Text
                            content={datetime(comment.createdAt)
                                .tz('Europe/Moscow')
                                .format('D MMM YYYY в H:mm')}
                            type="body-xs"
                        />
                    }
                </Flex>

                <Content content={comment.content} html />
            </div>

            {user?.id === author?.id && !readOnly && !isEditing &&
                <Menu
                    trigger={
                        <IconButton
                            className={styles.menu}
                            icon="more_vert"
                            color="neutral"
                            size="sm"
                            variant="plain"
                        />
                    }
                    items={[
                        {
                            key: 'edit',
                            icon: <Icon>edit</Icon>,
                            content: 'Редактировать',
                            onClick: toggleEditing
                        },
                        {
                            key: 'delete',
                            icon: <Icon>delete</Icon>,
                            content: 'Удалить',
                            onClick: handleDelete
                        }
                    ]}
                />
            }
        </div>
    );
}