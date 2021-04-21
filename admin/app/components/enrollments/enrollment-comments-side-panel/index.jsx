import React, { useCallback } from 'react';
import {
    Button
} from 'mdc-react';

import SidePanel from 'app/components/shared/side-panel';
import CommentCard from 'shared/components/comment-card';
import CommentForm from 'shared/components/comment-form';

import { useStore, useActions } from 'app/hooks/store';

import './index.scss';

export default function EnrollmentCommentsSidePanel({ enrollment, ...props }) {
    const [user] = useStore('user');
    const actions = useActions('comments');

    const createComment = useCallback(data => {
        data.author = user.id;
        data.ref = enrollment.id;

        return actions.createComment(data);
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
                {enrollment.comments.map(comment =>
                    <CommentCard
                        key={comment.id}
                        user={user}
                        comment={comment}
                        onUpdate={updateComment}
                        onDelete={deleteComment}
                    />
                )}
            </SidePanel.Content>

            <SidePanel.Footer>
                <CommentForm
                    id="comment-form"
                    onSubmit={createComment}
                />

                <Button type="submit" form="comment-form" unelevated>Отправить</Button>
            </SidePanel.Footer>
        </SidePanel>
    );
}