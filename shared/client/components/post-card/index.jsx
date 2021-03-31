import React from 'react';
import {
    Avatar,
    Button,
    Card,
    Icon,
    IconButton
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
    const [isCommenting, toggleCommenting] = useBoolean(false);

    return (
        <Card element="article" className="post-card">
            <Card.Header
                graphic={<Avatar src={post.user.imageUrl} text={post.user?.initials} large />}
                title={post.user.fullname}
                subtitle={post.timeSinceCreated}
                actions={user.id === post.user.id && (!isEditing &&
                    <MenuButton
                        items={[
                            {
                                key: 'edit',
                                graphic: <Icon>edit</Icon>,
                                text: 'Редактировать',
                                onClick: toggleEditing
                            },
                            {
                                key: 'delete',
                                graphic: <Icon>delete</Icon>,
                                text: 'Удалить',
                                onClick: () => onDelete(post)
                            }
                        ]}
                    />
                )}
            />

            <Card.Section>
                {isEditing ?
                    <PostForm
                        id="update-post-form"
                        onSubmit={onUpdate}
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
                            onUpdate={onUpdateComment}
                            onDelete={onDeleteComment}
                        />
                    )}
                </Card.Section>
            }

            {isCommenting &&
                <Card.Section>
                    <CommentForm
                        id="create-comment-form"
                        onSubmit={data => onCreateComment(post, data)}
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
                    (isCommenting ?
                        <>
                            <Button onClick={toggleCommenting}>Отменить</Button>
                            <Button type="submit" form="create-comment-form" outlined>Отправить</Button>
                        </>
                        :
                        <Button onClick={toggleCommenting}>Ответить</Button>
                    )
                }
            </Card.Actions>
        </Card>
    );
}