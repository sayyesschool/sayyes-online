import React, { useCallback, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { usePosts } from 'shared/hooks/posts';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import PostCard from 'shared/components/post-card';
import PostForm from 'shared/components/post-form';

import './index.scss';

export default function EnrollmentPosts({ enrollment }) {
    const [user] = useUser();
    const [posts, actions] = usePosts({ enrollment: enrollment.id });
    const [post] = useState(null);

    const [isPostFormOpen, togglePostFormOpen] = useBoolean(false);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreatePost = useCallback(data => {
        data.enrollment = enrollment.id;
        data.teacher = enrollment.teacher;
        data.client = enrollment.client;

        return actions.createPost(data)
            .then(() => togglePostFormOpen());
    }, [enrollment]);

    const handleUpdatePost = useCallback((postId, data) => {
        return actions.updatePost(postId, data);
    }, []);

    const handleDeletePost = useCallback(post => {
        return actions.deletePost(post.id);
    }, []);

    const handleCreateComment = useCallback((postId, data) => {
        return actions.createComment(postId, data)
            .then(() => toggleCommenting(false));
    }, []);

    const handleUpdateComment = useCallback((postId, commentId, data) => {
        return actions.updateComment(postId, commentId, data);
    }, []);

    const handleDeleteComment = useCallback((postId, commentId) => {
        return actions.deleteComment(postId, commentId);
    }, []);

    if (!posts) return <LoadingIndicator />;

    return (
        <div className="enrollment-posts">
            <LayoutGrid>
                <LayoutGrid.Cell span="12">
                    {isPostFormOpen ?
                        <Card className="new-post-card">
                            <Card.Header
                                graphic={<Avatar src={user.imageUrl} text={user?.initials} />}
                                title="Новая запись"
                            />

                            <PostForm
                                onSubmit={handleCreatePost}
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
                                onUpdate={handleUpdatePost}
                                onDelete={toggleConfirmationDialogOpen}
                                onCreateComment={handleCreateComment}
                                onUpdateComment={handleUpdateComment}
                                onDeleteComment={handleDeleteComment}
                            />
                        ) : (
                            <Typography align="center">Записей пока нет</Typography>
                        )
                    }
                </LayoutGrid.Cell>
            </LayoutGrid>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить запись?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeletePost}
                onClose={toggleConfirmationDialogOpen}
            />
        </div>
    );
}