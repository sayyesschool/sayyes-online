import React, { useCallback, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    IconButton,
    LayoutGrid,
    TextField
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { usePosts } from 'shared/hooks/posts';
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
    const [isSearching, toggleSearching] = useBoolean(false);

    const handleCreatePost = useCallback(data => {
        data.enrollment = enrollment.id;

        return actions.createPost(data)
            .then(() => togglePostFormOpen());
    }, [enrollment]);

    const handleUpdatePost = useCallback((post, data) => {
        return actions.updatePost(post.id, data);
    }, []);

    const handleDeletePost = useCallback(post => {
        return actions.deletePost(post.id, data);
    }, []);

    const handleCreateComment = useCallback((post, data) => {
        return actions.createComment(post.id, data)
            .then(() => toggleCommenting(false));
    }, [post]);

    const handleUpdateComment = useCallback((post, data) => {
        return actions.updateComment(post.id, data.id, data);
    }, [post]);

    const handleDeleteComment = useCallback((post, comment) => {
        return actions.deleteComment(post.id, comment.id);
    }, [post]);

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

                {posts.map(post =>
                    <LayoutGrid.Cell span="12">
                        <PostCard
                            key={post.id}
                            user={user}
                            post={post}
                            onUpdate={handleUpdatePost}
                            onDelete={handleDeletePost}
                            onCreateComment={handleCreateComment}
                            onUpdateComment={handleUpdateComment}
                            onDeleteComment={handleDeleteComment}
                        />
                    </LayoutGrid.Cell>
                )}
            </LayoutGrid>
        </div>
    );
}