import { useCallback } from 'react';
import {
    Button,
    Card
} from 'mdc-react';

import { useUser } from 'shared/hooks/user';
import { useBoolean } from 'shared/hooks/state';
import CommentCard from 'shared/components/comment-card';

// import './index.scss';

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
        <Card>
            <Card.Header title="Комментарии" />

            {exercise.comments?.length > 0 &&
                <Card.Section primary>
                    {exercise.comments.map(comment =>
                        <CommentCard
                            key={comment.id}
                            user={user}
                            comment={comment}
                            onSave={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    )}
                </Card.Section>
            }

            {isCommenting ?
                <Card.Section secondary>
                    <CommentCard
                        user={user}
                        editing
                        onToggle={toggleCommenting}
                        onSave={handleCreateComment}
                    />
                </Card.Section>
                :
                <Card.Actions>
                    <Card.Action button>
                        <Button
                            label="Оставить комментарий"
                            icon="comment"
                            outlined
                            onClick={toggleCommenting}
                        />
                    </Card.Action>
                </Card.Actions>
            }
        </Card>
    );
}