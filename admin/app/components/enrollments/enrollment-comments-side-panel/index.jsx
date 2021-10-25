import { useCallback } from 'react';
import {
    Card,
    Button,
    FAB,
    Icon,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import CommentCard from 'shared/components/comment-card';
import CommentForm from 'shared/components/comment-form';
import EmptyState from 'shared/components/empty-state';

import { useStore, useActions } from 'app/hooks/store';
import SidePanel from 'app/components/shared/side-panel';

import './index.scss';

export default function EnrollmentCommentsSidePanel({ enrollment, ...props }) {
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
        <SidePanel
            className="enrollment-comments-side-panel"
            title="Комментарии"
            {...props}
        >
            <SidePanel.Content>
                {enrollment.comments?.length > 0 ?
                    enrollment.comments.map(comment =>
                        <CommentCard
                            key={comment.id}
                            user={user}
                            comment={comment}
                            onUpdate={updateComment}
                            onDelete={deleteComment}
                        />
                    ) : (
                        <EmptyState
                            icon="comment"
                            title="Комментариев нет"
                        />
                    )
                }
            </SidePanel.Content>

            {isCommenting &&
                <SidePanel.Footer>
                    <Card>
                        <Card.Header
                            title="Новый комментарий"
                            actions={
                                <IconButton
                                    icon="close"
                                    onClick={toggleCommenting}
                                />
                            }
                        />

                        <CommentForm
                            id="comment-form"
                            onSubmit={createComment}
                        />

                        <Card.Actions>
                            <Button type="submit" form="comment-form" unelevated>Отправить</Button>
                        </Card.Actions>
                    </Card>
                </SidePanel.Footer>
            }

            <FAB
                icon={<Icon>comment</Icon>}
                exited={isCommenting}
                onClick={toggleCommenting}
            />
        </SidePanel>
    );
}