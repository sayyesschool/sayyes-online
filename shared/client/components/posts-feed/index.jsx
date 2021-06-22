import React, { useCallback, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    LayoutGrid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { usePosts } from 'shared/hooks/posts';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import EmptyState from 'shared/components/empty-state';
import PostCard from 'shared/components/post-card';
import PostForm from 'shared/components/post-form';

import './index.scss';

const noop = arg => arg;

export default function PostsFeed({ query, beforeCreate = noop }) {
    const [user] = useUser();
    const [posts, actions] = usePosts(query);
    const [postId, setPostId] = useState(null);

    const [isPostFormOpen, togglePostFormOpen] = useBoolean(false);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPost = useCallback(data => {
        return actions.createPost(beforeCreate(data))
            .then(() => togglePostFormOpen());
    }, [beforeCreate]);

    const updatePost = useCallback((postId, data) => {
        return actions.updatePost(postId, data);
    }, []);

    const deletePost = useCallback(() => {
        return actions.deletePost(postId)
            .then(() => toggleConfirmationDialogOpen(false));
    }, [postId]);

    const handleDeletePost = useCallback(postId => {
        setPostId(postId);
        toggleConfirmationDialogOpen(true);
    }, []);

    const createComment = useCallback((postId, data) => {
        return actions.createComment(postId, data)
            .then(() => toggleCommenting(false));
    }, []);

    const updateComment = useCallback((postId, commentId, data) => {
        return actions.updateComment(postId, commentId, data);
    }, []);

    const deleteComment = useCallback((postId, commentId) => {
        return actions.deleteComment(postId, commentId);
    }, []);

    if (!posts) return <LoadingIndicator />;

    return (
        <div className="posts-feed">
            <LayoutGrid>
                <LayoutGrid.Cell span="12">
                    {isPostFormOpen ?
                        <Card className="new-post-card">
                            <Card.Header
                                graphic={<Avatar src={user.imageUrl} text={user?.initials} />}
                                title="Новая запись"
                            />

                            <PostForm
                                onSubmit={createPost}
                            />

                            <Card.Actions>
                                <Button onClick={togglePostFormOpen}>Отменить</Button>
                                <Button type="submit" form="post-form" outlined>Сохранить</Button>
                            </Card.Actions>
                        </Card>
                        :
                        <Card>
                            <Card.PrimaryAction onClick={togglePostFormOpen}>
                                <Card.Header
                                    graphic={<Avatar src={user.imageUrl} text={user?.initials} />}
                                    subtitle="What's going on?"
                                />
                            </Card.PrimaryAction>
                        </Card>
                    }
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="12">
                    {posts.length > 0 ?
                        posts.map(post =>
                            <PostCard
                                key={post.id}
                                user={user}
                                post={post}
                                onUpdate={updatePost}
                                onDelete={handleDeletePost}
                                onCreateComment={createComment}
                                onUpdateComment={updateComment}
                                onDeleteComment={deleteComment}
                            />
                        ) : (
                            <EmptyState
                                icon="feed"
                                title="Записей пока нет"
                            />
                        )
                    }
                </LayoutGrid.Cell>
            </LayoutGrid>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить запись и комментарии к ней?"
                open={isConfirmationDialogOpen}
                onConfirm={deletePost}
                onClose={toggleConfirmationDialogOpen}
            />
        </div>
    );
}