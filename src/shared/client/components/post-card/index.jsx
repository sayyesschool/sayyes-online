import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import PostContent from 'shared/components/post-content';
import PostComments from 'shared/components/post-comments';
import PostForm from 'shared/components/post-form';
import { Avatar, Box, Button, Card, Flex, Icon, IconButton, MenuButton, Text } from 'shared/ui-components';

import './index.scss';

export default function PostCard({
    user,
    post,
    onUpdate,
    onDelete,
    onCreateComment,
    onUpdateComment,
    onDeleteComment
}) {
    const [isEditing, toggleEditing] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        return onUpdate(post.id, data)
            .then(() => toggleEditing(false));
    }, [post, onUpdate]);

    const handleDelete = useCallback(() => {
        return onDelete(post.id);
    }, [post, onDelete]);

    return (
        <Card as="article" className="PostCard">
            <Box className="PostCard__header">
                <Flex gap="medium" alignItems="center">
                    <Avatar
                        imageSrc={post.author?.imageUrl}
                        text={post.author?.initials}
                        size="lg"
                    />

                    <Flex column>
                        <Text type="body1">{post.author?.fullname}</Text>
                        <Text type="body2">{post.formattedDateTime}</Text>
                    </Flex>
                </Flex>

                {user?.id === post?.author?.id &&
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
            </Box>

            <Box className="PostCard__body">
                {isEditing ?
                    <PostForm
                        id="update-post-form"
                        post={post}
                        onSubmit={handleUpdate}
                    />
                    :
                    <>
                        <PostContent
                            post={post}
                        />

                        <PostComments
                            user={user}
                            post={post}
                            onCreate={onCreateComment}
                            onUpdate={onUpdateComment}
                            onDelete={onDeleteComment}
                        />
                    </>
                }
            </Box>

            {isEditing &&
                <Box className="PostCard__footer">
                    <Button
                        content="Отменить"
                        variant="plain"
                        onClick={toggleEditing}
                    />

                    <Button
                        type="submit"
                        content="Сохранить"
                        form="update-post-form"
                    />
                </Box>
            }
        </Card>
    );
}