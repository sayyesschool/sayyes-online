import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import { usePost } from 'shared/hooks/posts';
import { Avatar, Button, Card, Icon, Surface, Text } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PostContent from 'shared/components/post-content';
import Comment from 'shared/components/comment';
import CommentForm from 'shared/components/comment-form';

import './index.scss';

export default function PostPage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [post, actions] = usePost(match.params.postId);

    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleUpdatePost = useCallback(data => {
        return actions.updatePost(post.id, data);
    }, [post]);

    const handleCreateComment = useCallback(data => {
        return actions.createComment(post.id, data)
            .then(() => toggleCommenting(false));
    }, [post]);

    const handleUpdateComment = useCallback(data => {
        return actions.updateComment(post.id, data.id, data);
    }, [post]);

    const handleDeleteComment = useCallback(comment => {
        return actions.deleteComment(post.id, comment.id);
    }, [post]);

    if (!enrollment || !post) return <LoadingIndicator />;

    return (
        <Page id="post-page">
            <Page.Header
                breadcrumbs={[
                    <Link to={enrollment.url}>{enrollment.title}</Link>
                ]}
                title={`Отчет от ${post.dateCreated}`}
                actions={!post.read && <Button onClick={() => handleUpdatePost({ read: true })} raised>Отметить как прочитанный</Button>}
                pullContent
            />

            <Page.Content>
                <Surface>
                    <Card.Header
                        graphic={<Avatar src={post.user.imageUrl} large />}
                        title={post.user.fullname}
                        subtitle={post.timeSinceCreated}
                    />

                    <PostContent
                        post={post}
                    />
                </Surface>

                {post.comments?.length > 0 && <>
                    <Text>Комментарии</Text>

                    {post.comments.map(comment =>
                        <Comment
                            comment={comment}
                            onUpdate={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    )}
                </>}

                {isCommenting ?
                    <Surface outlined>
                        <Text
                            content="Новый комментарий"
                        />

                        <CommentForm
                            id="new-comment-form"
                            onSubmit={handleCreateComment}
                        />

                        <Flex>
                            <Button onClick={toggleCommenting}>Закрыть</Button>

                            <Button type="submit" form="new-comment-form" icon={<Icon>send</Icon>} outlined>Отправить</Button>
                        </Flex>
                    </Surface>
                    :
                    <Button onClick={toggleCommenting} outlined>Оставить комментарий</Button>
                }
            </Page.Content>
        </Page>
    );
}