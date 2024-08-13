import { useCallback } from 'react';

import Comment from 'shared/components/comment';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { Button } from 'shared/ui-components';

export default function ExerciseComments({
    exercise,
    onCreate,
    onUpdate,
    onDelete
}) {
    const [user] = useUser();

    const [isCommenting, toggleCommenting] = useBoolean(false);

    console.log(123, { isCommenting });

    const handleCreateComment = useCallback(data => {
        return onCreate({ itemId: exercise.id, ...data })
            .then(() => toggleCommenting(false));
    }, [exercise.id, onCreate, toggleCommenting]);

    const handleUpdateComment = useCallback((data, commentId) => {
        return onUpdate(data, commentId);
    }, [onUpdate]);

    const handleDeleteComment = useCallback(commentId => {
        return onDelete(commentId);
    }, [onDelete]);

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