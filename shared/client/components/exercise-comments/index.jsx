import { useCallback } from 'react';

import { useUser } from 'shared/hooks/user';
import { useBoolean } from 'shared/hooks/state';
import Button from 'shared/components/button';
import Comment from 'shared/components/comment';
import PageSection from 'shared/components/page-section';

export default function ExerciseComments({ exercise, onCreate, onUpdate, onDelete }) {
    const [user] = useUser();

    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleCreateComment = useCallback((_, data) => {
        return onCreate(exercise.id, data)
            .then(() => toggleCommenting(false));
    }, [exercise]);

    const handleUpdateComment = useCallback((commentId, data) => {
        return onUpdate(exercise.id, commentId, data);
    }, [exercise]);

    const handleDeleteComment = useCallback(commentId => {
        return onDelete(exercise.id, commentId);
    }, [exercise]);

    return (
        <PageSection title="Комментарии">
            {exercise.comments?.map(comment =>
                <Comment
                    key={comment.id}
                    user={user}
                    comment={comment}
                    onSave={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />
            )}

            {isCommenting ?
                <Comment
                    user={user}
                    editing
                    onToggle={toggleCommenting}
                    onSave={handleCreateComment}
                />
                :
                <Button
                    label="Оставить комментарий"
                    icon="comment"
                    outlined
                    onClick={toggleCommenting}
                />
            }
        </PageSection>
    );
}