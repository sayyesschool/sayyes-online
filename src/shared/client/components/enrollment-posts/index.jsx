import { useCallback, useState } from 'react';

import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { usePosts } from 'shared/hooks/posts';
import { Button, Card, Flex } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import EmptyState from 'shared/components/empty-state';
import PostCard from 'shared/components/post-card';
import PostForm from 'shared/components/post-form';

export default function EnrollmentPosts({ enrollment }) {
    const [user] = useUser();
    const [posts, actions] = usePosts({ enrollment: enrollment.id });

    const [postId, setPostId] = useState(null);
    const [isPostFormOpen, togglePostFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createPost = useCallback(data => {
        data.enrollment = enrollment.id;
        data.teacher = enrollment.teacher;
        data.client = enrollment.client;

        return actions.createPost(data)
            .then(() => togglePostFormOpen());
    }, [enrollment]);

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
        return actions.createComment(postId, data);
    }, []);

    const updateComment = useCallback((postId, commentId, data) => {
        return actions.updateComment(postId, commentId, data);
    }, []);

    const deleteComment = useCallback((postId, commentId) => {
        return actions.deleteComment(postId, commentId);
    }, []);

    if (!posts) return <LoadingIndicator />;

    return (
        <PageSection
            className="EnrollmentPosts"
            title={isPostFormOpen ? 'Новая запись' : 'Записи'}
            sx={{ backgroundColor: 'transparent' }}
            actions={!isPostFormOpen &&
                <Button
                    className="new-post-button"
                    icon="create"
                    content="Новая запись"
                    variant="plain"
                    onClick={togglePostFormOpen}
                />
            }
            compact
        >
            <Flex column gap="medium">
                {isPostFormOpen &&
                    <Card>
                        <Flex column gap="smaller">
                            <PostForm
                                user={user}
                                onSubmit={createPost}
                            />

                            <Flex justifyContent="space-between">
                                <Button
                                    content="Отменить"
                                    variant="plain"
                                    color="neutral"
                                    onClick={togglePostFormOpen}
                                />

                                <Button
                                    type="submit"
                                    form="post-form"
                                    content="Сохранить"
                                />
                            </Flex>
                        </Flex>
                    </Card>
                }

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
            </Flex>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить запись и комментарии к ней?"
                open={isConfirmationDialogOpen}
                onConfirm={deletePost}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}