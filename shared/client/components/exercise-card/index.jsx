import { useCallback, useRef } from 'react';
import {
    Avatar,
    Button,
    Card,
    IconButton
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContent from 'shared/components/exercise-content';
import CommentCard from 'shared/components/comment-card';

import './index.scss';

export default function ExerciseCard({ number, user, exercise, onProgressChange }) {
    const exerciseContent = useRef();

    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isSaving, setSaving] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state: exerciseContent.current.state }).then(() => setSaving(false));
    }, []);

    const handleStatus = useCallback(() => {
        return onProgressChange(exercise, { completed: !exercise.isCompleted });
    }, []);

    const handleCreateComment = useCallback((_, data) => {
        return onCreateComment(exercise.id, data)
            .then(() => toggleCommenting(false));
    }, [exercise]);

    const handleUpdateComment = useCallback((commentId, data) => {
        return onUpdateComment(exercise.id, commentId, data);
    }, [exercise]);

    const handleDeleteComment = useCallback(commentId => {
        return onDeleteComment(exercise.id, commentId);
    }, [exercise]);

    const classNames = classnames('exercise-card', `exercise-card--${exercise.type}`);

    return (
        <Card className={classNames}>
            <Card.PrimaryAction onClick={toggleCollapsed}>
                <Card.Header
                    graphic={
                        <Avatar text={number} size="medium" />
                    }
                    title={exercise.title}
                    subtitle={exercise.description}
                    actions={[
                        <IconButton
                            key="toggle"
                            icon={isCollapsed ? 'expand_more' : 'expand_less'}
                        />
                    ]}
                />
            </Card.PrimaryAction>

            {!isCollapsed &&
                <>
                    <Card.Section primary>
                        <ExerciseContent
                            ref={exerciseContent}
                            exercise={exercise}
                        />
                    </Card.Section>

                    {exercise.type !== 'text' &&
                        <Card.Actions>
                            <Card.Action button>
                                <Button
                                    label="Сохранить"
                                    icon="save"
                                    outlined
                                    disabled={isSaving}
                                    onClick={handleSave}
                                />
                            </Card.Action>
                        </Card.Actions>
                    }

                    {exercise.comments?.length > 0 &&
                        <Card.Section secondary>
                            <Typography type="subtitle2">Комментарии</Typography>

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

                    {isCommenting &&
                        <Card.Section secondary>
                            <CommentCard
                                user={user}
                                editing
                                onToggle={toggleCommenting}
                                onSave={handleCreateComment}
                            />
                        </Card.Section>
                    }

                    <Card.Actions>
                        {/* <Card.Action button>
                            <Button
                                label="Проверить"
                                icon="done_all"
                                outlined
                                onClick={handleStatus}
                            />
                        </Card.Action> */}

                        <Card.Action button>
                            <Button
                                label="Оставить комментарий"
                                icon="comment"
                                outlined
                                onClick={toggleCommenting}
                            />
                        </Card.Action>
                    </Card.Actions>
                </>
            }
        </Card>
    );
}