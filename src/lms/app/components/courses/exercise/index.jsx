import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import Content from 'shared/components/content';
import { Avatar, Button, Card } from 'shared/ui-components';

import ExerciseContent from 'lms/components/courses/exercise-content';
// import ExerciseComments from 'app/components/courses/exercise-comments';

import './index.scss';

export default function Exercise({
    index,
    user,
    exercise,
    onProgressChange,
    onComplete
}) {
    const [state, setState] = useState(exercise.state || {});
    const [isChecked, setChecked] = useBoolean(false);
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isSaving, setSaving] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state })
            .finally(() => setSaving(false));
    }, [state, exercise, onProgressChange]);

    const handleComplete = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { completed: !exercise.completed })
            .finally(() => setSaving(false));
    }, [exercise, onComplete]);

    const handleCheck = useCallback(() => {
        setChecked(true);
    }, []);

    const handleUpdateState = useCallback((itemId, state) => {
        setState(oldState => ({
            ...oldState,
            [itemId]: typeof state === 'function' ? state(oldState[itemId]) : state
        }));
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

    const hasSaveableItems = user.role === 'client' && exercise.items.some(item =>
        item.type === 'essay' ||
        item.type === 'fib' ||
        item.type === 'input'
    );

    const hasCheckableItems = exercise.items.some(item =>
        item.type === 'fib' ||
        (item.type === 'input' && item.items?.length > 0)
    );

    return (
        <Card className="Exercise">
            <header className="Exercise__header" onClick={toggleCollapsed}>
                <Avatar
                    text={index + 1}
                    color={exercise.completed ? 'primary' : undefined}
                    size="sm"
                />

                <Content
                    content={exercise.description}
                    html
                />
            </header>

            {!isCollapsed && <>
                <ExerciseContent
                    exercise={exercise}
                    state={state}
                    checked={isChecked}
                    disabled={user.role === 'teacher'}
                    onUpdateState={handleUpdateState}
                />

                <footer className="Exercise__footer">
                    {hasCheckableItems &&
                        <Button
                            content="Проверить"
                            icon="done"
                            variant="outlined"
                            onClick={handleCheck}
                        />
                    }

                    {hasSaveableItems &&
                        <Button
                            content="Сохранить"
                            icon="save"
                            variant="outlined"
                            disabled={isSaving}
                            onClick={handleSave}
                        />
                    }

                    {/* <Button
                            label="Оставить комментарий"
                            icon="comment"
                            outlined
                            onClick={toggleCommenting}
                        /> */}

                    {user.role === 'teacher' &&
                        <Button
                            content={exercise.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
                            icon={exercise.completed ? 'task_alt' : undefined}
                            variant="outlined"
                            disabled={isSaving}
                            onClick={handleComplete}
                        />
                    }
                </footer>

                {/* <ExerciseComments
                    exercise={exercise}
                    onCreate={handleCreateComment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                /> */}
            </>}
        </Card>
    );
}