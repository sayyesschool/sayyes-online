import { useCallback } from 'react';

import { useUser } from 'shared/hooks/user';
import { useBoolean } from 'shared/hooks/state';
import Comment from 'shared/components/comment';
import { Button } from 'shared/ui-components';

export default function ExerciseComments({
    exercise,
    onCreate,
    onUpdate,
    onDelete
}) {
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
        <>
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
                    content="Оставить комментарий"
                    icon="comment"
                    text
                    onClick={toggleCommenting}
                />
            }
        </>
    );
}