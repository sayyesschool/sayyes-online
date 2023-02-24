import { useCallback } from 'react';
import {
    Card
} from 'mdc-react';

import { usePost } from 'shared/hooks/posts';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import PostForm from './post-form';

import './index.scss';

export default function PostPage({ match }) {
    const [post, actions] = usePost(match.params.id);

    const handleUpdatePost = useCallback(data => {
        actions.updatePost(post.id, data);
    }, [post]);

    const handleDeletePost = useCallback(() => {
        if (confirm('Вы уверены что хотите удалить запись?')) {
            actions.deletePost(post.id);
        }
    }, [post]);

    const handleCreateComment = useCallback(data => {
        actions.createComment(post.id, data);
    }, [post]);

    const handleUpdateComment = useCallback(data => {
        actions.updateComment(post.id, data.id, data);
    }, [post]);

    const handleDeleteComment = useCallback(comment => {
        actions.deleteComment(post.id, comment.id);
    }, [post]);

    if (!post) return <LoadingIndicator />;

    return (
        <Page id="post-page">
            <PageHeader
                title="Запись"
                toolbar={[
                    { key: 'save', icon: 'save', type: 'submit', form: 'assignment-form', title: 'Сохранить' },
                    { key: 'delete', icon: 'delete', title: 'Удалить', onClick: handleDeletePost },
                ]}
            />

            <PageContent>
                <Card outlined>
                    <PostForm
                        post={post}
                        onSubmit={handleUpdatePost}
                    />
                </Card>
            </PageContent>
        </Page>
    );
}