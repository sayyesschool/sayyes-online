import { useCallback } from 'react';
import {
    Avatar,
    Button,
    Card,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import MenuButton from 'shared/components/menu-button';
import PostContent from 'shared/components/post-content';
import PostForm from 'shared/components/post-form';
import CommentCard from 'shared/components/comment-card';

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
        <Card element="article" className="post-card">
            <Card.Header
                graphic={<Avatar src={post.user.imageUrl} text={post.user?.initials} size="medium" />}
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

            <Card.Section primary>
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

            {!isEditing && post.comments.length > 0 &&
                <Card.Section secondary>
                    <Typography type="subtitle2">Комментарии</Typography>

                    {post.comments.map(comment =>
                        <CommentCard
                            key={comment.id}
                            user={user}
                            comment={comment}
                            onSave={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    )}
                </Card.Section>
            }

            {isCommenting &&
                <Card.Section secondary>
                    <CommentCard
                        user={user}
                        editing
                        onToggle={toggleCommenting}
                        onSave={handleCreateComment}
                    />
                </Card.Section>
            }

            {isEditing ?
                <Card.Actions>
                    <Button onClick={toggleEditing}>Отменить</Button>
                    <Button type="submit" form="update-post-form" outlined>Сохранить</Button>
                </Card.Actions>
                :
                (!isCommenting &&
                    <Card.Actions>
                        <Button className="reply-button" outlined onClick={toggleCommenting}>Ответить</Button>
                    </Card.Actions>
                )
            }
        </Card>
    );
}