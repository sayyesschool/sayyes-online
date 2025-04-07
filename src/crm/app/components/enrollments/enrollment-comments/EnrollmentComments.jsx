import { useCallback } from 'react';

import Comment from 'shared/components/comment';
import CommentForm from 'shared/components/comment-form';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Text } from 'shared/ui-components';

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
    }, [user, enrollment, actions, toggleCommenting]);

    const updateComment = useCallback((commentId, data) => {
        return actions.updateComment(commentId, data);
    }, [actions]);

    const deleteComment = useCallback(commentId => {
        return actions.deleteComment(commentId);
    }, [actions]);

    return (
        <PageSection
            className="EnrollmentComments"
            title="Комментарии"
            actions={!isCommenting && [{
                key: 'add',
                icon: 'add',
                size: 'sm',
                onClick: toggleCommenting
            }]}
        >
            {enrollment.comments?.map(comment =>
                <Comment
                    key={comment.id}
                    user={user}
                    comment={comment}
                    onSave={updateComment}
                    onDelete={deleteComment}
                />
            )}

            {isCommenting &&
                <Flex dir="column" gap="xs">
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text type="title-sm">Новый комментарий</Text>

                    </Flex>

                    <CommentForm
                        id="comment-form"
                        onSubmit={createComment}
                    />

                    <Flex alignItems="center" justifyContent="space-between">
                        <Button
                            content="Отменить"
                            variant="plain"
                            onClick={toggleCommenting}
                        />

                        <Button
                            type="submit"
                            form="comment-form"
                            content="Отправить"
                        />
                    </Flex>
                </Flex>
            }
        </PageSection>
    );
}