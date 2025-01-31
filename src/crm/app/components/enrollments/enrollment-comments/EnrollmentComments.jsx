import { useCallback } from 'react';

import Comment from 'shared/components/comment';
import CommentForm from 'shared/components/comment-form';
import EmptyState from 'shared/components/empty-state';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import { Button, Text } from 'shared/ui-components';

import { useActions, useStore } from 'crm/store';

export default function EnrollmentComments({ enrollment }) {
    const [user] = useStore('user');
    const actions = useActions('comments');

    const [isCommenting, toggleCommenting] = useBoolean(false);

    const createComment = useCallback(data => {
        if (!data.content) return;

        data.author = user.id;
        data.ref = enrollment.id;

        return actions.createComment(data)
            .then(() => toggleCommenting(false));
    }, [user, enrollment]);

    const updateComment = useCallback((commentId, data) => {
        return actions.updateComment(commentId, data);
    }, []);

    const deleteComment = useCallback(commentId => {
        return actions.deleteComment(commentId);
    }, []);

    return (
        <PageSection
            className="EnrollmentComments"
            title="Комментарии"
        >
            {enrollment.comments?.length > 0 ?
                enrollment.comments?.map(comment =>
                    <Comment
                        key={comment.id}
                        user={user}
                        comment={comment}
                        onSave={updateComment}
                        onDelete={deleteComment}
                    />
                )
                :
                <EmptyState
                    icon="comment"
                    title="Комментариев нет"
                />
            }

            {isCommenting &&
                <div>
                    <Text>Новый комментарий</Text>

                    <Button
                        icon="close"
                        onClick={toggleCommenting}
                    />

                    <CommentForm
                        id="comment-form"
                        onSubmit={createComment}
                    />

                    <Button type="submit" form="comment-form">Отправить</Button>
                </div>
            }
        </PageSection>
    );
}