import { useCallback, useRef } from 'react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import Button from 'shared/ui-components/button';
import Flex from 'shared/ui-components/flex';
import Header from 'shared/ui-components/header';
import Surface from 'shared/ui-components/surface';
import Text from 'shared/ui-components/text';
import ExerciseItem from 'shared/components/exercise-item';
// import CommentCard from 'shared/components/comment-card';

import './index.scss';

export default function ExerciseCard({ number, user, exercise, onProgressChange }) {
    const exerciseItem = useRef();

    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isSaving, setSaving] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state: exerciseItem.current.state }).then(() => setSaving(false));
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
        <Surface className={classNames}>
            <Flex onClick={toggleCollapsed}>
                <Header
                    content={exercise.title}
                    description={exercise.description}
                />

                <Button
                    key="toggle"
                    icon={isCollapsed ? 'expand_more' : 'expand_less'}
                />
            </Flex>

            {!isCollapsed &&
                <Flex>
                    <ExerciseItem
                        ref={exerciseItem}
                        exercise={exercise}
                    />

                    {exercise.type !== 'text' &&
                        <Button
                            label="Сохранить"
                            icon="save"
                            outlined
                            disabled={isSaving}
                            onClick={handleSave}
                        />
                    }

                    {exercise.comments?.length > 0 &&
                        <Flex column>
                            <Text>Комментарии</Text>

                            {/* {exercise.comments.map(comment =>
                                <CommentCard
                                    key={comment.id}
                                    user={user}
                                    comment={comment}
                                    onSave={handleUpdateComment}
                                    onDelete={handleDeleteComment}
                                />
                            )} */}
                        </Flex>
                    }

                    {/* {isCommenting &&
                        <CommentCard
                            user={user}
                            editing
                            onToggle={toggleCommenting}
                            onSave={handleCreateComment}
                        />
                    } */}

                    <Flex>
                        {/* <Button
                            label="Проверить"
                            icon="done_all"
                            outlined
                            onClick={handleStatus}
                        /> */}

                        <Button
                            label="Оставить комментарий"
                            icon="comment"
                            outlined
                            onClick={toggleCommenting}
                        />
                    </Flex>
                </Flex>
            }
        </Surface>
    );
}