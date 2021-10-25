import { useCallback } from 'react';
import {
    Avatar,
    Button,
    Card
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import MenuButton from 'shared/components/menu-button';
import PostContent from 'shared/components/post-content';
import PostForm from 'shared/components/post-form';
import CommentCard from 'shared/components/comment-card';
import CommentForm from 'shared/components/comment-form';

import './index.scss';

export default function PostCard({ user, post, onUpdate, onDelete, onCreateComment, onUpdateComment, onDeleteComment }) {
    const [isEditing, toggleEditing] = useBoolean(false);
    const [isCreating, toggleCreating] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        return onUpdate(post.id, data)
            .then(() => toggleEditing(false));
    }, [post]);

    const handleDelete = useCallback(() => {
        return onDelete(post.id);
    }, [post]);

    const handleCreateComment = useCallback(data => {
        return onCreateComment(post.id, data)
            .then(() => toggleCreating(false));
    }, [post]);

    const handleUpdateComment = useCallback((commentId, data) => {
        return onUpdateComment(post.id, commentId, data);
    }, [post]);

    const handleDeleteComment = useCallback(commentId => {
        return onDeleteComment(post.id, commentId);
    }, [post]);

    return (
        <Card element="article" className="post-card">
            <Card.Header
                graphic={<Avatar src={post.user.imageUrl} text={post.user?.initials} large />}
                title={post.title || post.user.fullname}
                subtitle={post.datetimeLabel}
                actions={user.id === post.user.id && (!isEditing &&
                    <MenuButton
                        items={[
                            {
                                key: 'edit',
                                icon: 'edit',
                                text: 'Редактировать',
                                onClick: toggleEditing
                            },
                            {
                                key: 'delete',
                                icon: 'delete',
                                text: 'Удалить',
                                onClick: handleDelete
                            }
                        ]}
                    />
                )}
            />

            <Card.Section>
                {isEditing ?
                    <PostForm
                        id="update-post-form"
                        post={post}
                        onSubmit={handleUpdate}
                    />
                    :
                    <PostContent
                        post={post}
                    />
                }
            </Card.Section>

            {!isEditing &&
                <Card.Section>
                    {post.comments.map(comment =>
                        <CommentCard
                            key={comment.id}
                            user={user}
                            comment={comment}
                            onUpdate={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    )}
                </Card.Section>
            }

            {isCreating &&
                <Card.Section>
                    <CommentForm
                        id="create-comment-form"
                        onSubmit={handleCreateComment}
                    />
                </Card.Section>
            }

            <Card.Actions>
                {isEditing ?
                    <>
                        <Button onClick={toggleEditing}>Отменить</Button>
                        <Button type="submit" form="update-post-form" outlined>Сохранить</Button>
                    </>
                    :
                    (isCreating ?
                        <>
                            <Button onClick={toggleCreating}>Отменить</Button>
                            <Button type="submit" form="create-comment-form" outlined>Отправить</Button>
                        </>
                        :
                        <Button onClick={toggleCreating}>Ответить</Button>
                    )
                }
            </Card.Actions>
        </Card>
    );
}