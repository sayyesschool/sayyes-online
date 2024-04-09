import { useCallback } from 'react';

import CommentForm from 'shared/components/comment-form';
import Content from 'shared/components/content';
import { useBoolean } from 'shared/hooks/state';
import { Avatar, Box, Button, Flex, Icon, IconButton, MenuButton, Text } from 'shared/ui-components';

export default function Comment({
    user = {},
    comment = {},
    editing = false,
    onToggle = Function.prototype,
    onSave,
    onDelete
}) {
    const [isEditing, toggleEditing] = useBoolean(editing);

    const handleSubmit = useCallback(data => {
        return onSave(data, comment.id).then(() => toggleEditing(false));;
    }, [comment.id, onSave, toggleEditing]);

    const handleDelete = useCallback(() => {
        return onDelete(comment.id);
    }, [comment, onDelete]);

    const handleToggle = useCallback(() => {
        onToggle();
        toggleEditing(false);
    }, [onToggle]);

    const author = comment.author || user;

    return isEditing ? (
        <div className="Comment Comment--editing">
            <CommentForm
                id="comment-form"
                comment={comment}
                onSubmit={handleSubmit}
            />

            <Flex justifyContent="space-between" sx={{ width: '100%' }}>
                <Button
                    type="button"
                    content="Отменить"
                    color="neutral"
                    variant="plain"
                    onClick={handleToggle}
                />

                <Button
                    type="submit"
                    content="Сохранить"
                    form="comment-form"
                />
            </Flex>
        </div>
    ) : (
        <div className="Comment">
            <Avatar
                src="https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg"
            />

            <Box sx={{ flex: '1' }}>
                <Text
                    type="body2"
                    content={author.fullname}
                    sx={{ lineHeight: '1' }}
                />

                <Text
                    type="body3"
                    content={comment.datetimeLabel}
                />

                <Content content={comment.content} html />
            </Box>

            {user?.id === author?.id &&
                <MenuButton
                    trigger={
                        <IconButton
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