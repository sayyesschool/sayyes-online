import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Card,
    Icon,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import { usePost } from 'shared/hooks/posts';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PostContent from 'shared/components/post-content';
import CommentCard from 'shared/components/comment-card';
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
            <PageHeader
                breadcrumbs={[
                    <Link to={enrollment.url}>{enrollment.title}</Link>
                ]}
                title={`Отчет от ${post.dateCreated}`}
                actions={!post.read && <Button onClick={() => handleUpdatePost({ read: true })} raised>Отметить как прочитанный</Button>}
                pullContent
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="12">
                        <Card outlined>
                            <Card.Header
                                graphic={<Avatar src={post.user.imageUrl} large />}
                                title={post.user.fullname}
                                subtitle={post.timeSinceCreated}
                            />

                            <PostContent
                                post={post}
                            />
                        </Card>
                    </LayoutGrid.Cell>

                    {post.comments?.length > 0 &&
                        <LayoutGrid.Cell span="12">
                            <Typography type="headline6">Комментарии</Typography>

                            {post.comments.map(comment =>
                                <CommentCard
                                    comment={comment}
                                    onUpdate={handleUpdateComment}
                                    onDelete={handleDeleteComment}
                                />
                            )}
                        </LayoutGrid.Cell>
                    }

                    <LayoutGrid.Cell span="12">
                        {isCommenting ?
                            <Card outlined>
                                <Card.Header
                                    title="Новый комментарий"
                                />

                                <CommentForm
                                    id="new-comment-form"
                                    onSubmit={handleCreateComment}
                                />

                                <Card.Actions>
                                    <Card.Action>
                                        <Button onClick={toggleCommenting}>Закрыть</Button>
                                    </Card.Action>

                                    <Card.Action>
                                        <Button type="submit" form="new-comment-form" icon={<Icon>send</Icon>} outlined>Отправить</Button>
                                    </Card.Action>
                                </Card.Actions>
                            </Card>
                            :
                            <Button onClick={toggleCommenting} outlined>Оставить комментарий</Button>
                        }
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}