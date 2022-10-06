import { useCallback } from 'react';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Header,
    MenuButton,
    Segment,
    Text
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Comment from 'shared/components/comment';
import Icon from 'shared/ui-components/icon';
import PostContent from 'shared/components/post-content';
import PostForm from 'shared/components/post-form';

import './index.scss';

export default function PostCard({ user, post, onUpdate, onDelete, onCreateComment, onUpdateComment, onDeleteComment }) {
    const [isEditing, toggleEditing] = useBoolean(false);
    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        return onUpdate(post.id, data)
            .then(() => toggleEditing(false));
    }, [post]);

    const handleDelete = useCallback(() => {
        return onDelete(post.id);
    }, [post]);

    const handleCreateComment = useCallback((_, data) => {
        return onCreateComment(post.id, data)
            .then(() => toggleCommenting(false));
    }, [post]);

    const handleUpdateComment = useCallback((commentId, data) => {
        return onUpdateComment(post.id, commentId, data);
    }, [post]);

    const handleDeleteComment = useCallback(commentId => {
        return onDeleteComment(post.id, commentId);
    }, [post]);

    return (
        <Segment as="article" className="post-card">
            <Flex className="post-card__header" space="between">
                <Flex gap="gap.medium" vAlign="center">
                    <Avatar
                        image={post.user.imageUrl}
                        name={post.user?.initials}
                        size="large"
                    />

                    <Flex column>
                        <Text weight="bold">{post.user.fullname}</Text>
                        <Text timestamp>{post.datetimeLabel}</Text>
                    </Flex>
                </Flex>

                <MenuButton
                    trigger={
                        <Button
                            icon={<Icon>more_vert</Icon>}
                            iconOnly
                            text
                        />
                    }
                    menu={[
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
            </Flex>

            <Box className="post-card__content">
                {isEditing ?
                    <PostForm
                        id="update-post-form"
                        post={post}
                        onSubmit={handleUpdate}
                    />
                    :
                    <>
                        {post.title &&
                            <Header as="h3">{post.title}</Header>
                        }

                        <PostContent
                            post={post}
                        />
                    </>
                }


                {!isEditing && post.comments.length > 0 &&
                    <Flex column>
                        <Text>Комментарии</Text>

                        {post.comments.map(comment =>
                            <Comment
                                key={comment.id}
                                user={user}
                                comment={comment}
                                onSave={handleUpdateComment}
                                onDelete={handleDeleteComment}
                            />
                        )}
                    </Flex>
                }

                {isCommenting &&
                    <Comment
                        user={user}
                        editing
                        onToggle={toggleCommenting}
                        onSave={handleCreateComment}
                    />
                }
            </Box>

            <Box className="post-card__footer">
                {isEditing ?
                    <Flex space="between">
                        <Button text onClick={toggleEditing}>Отменить</Button>
                        <Button type="submit" form="update-post-form" primary flat>Сохранить</Button>
                    </Flex>
                    :
                    (!isCommenting &&
                        <Button
                            className="reply-button"
                            icon={<Icon>reply</Icon>}
                            content="Ответить"
                            text
                            onClick={toggleCommenting}
                        />
                    )
                }
            </Box>
        </Segment>
    );
}