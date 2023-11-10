import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useBoolean } from 'shared/hooks/state';
import Content from 'shared/components/content';
import {
    Avatar,
    Button,
    Card,
    Chip,
    Icon,
    IconButton,
    Flex,
    MenuButton
} from 'shared/ui-components';

import ExerciseContent from 'lms/components/courses/exercise-content';
// import ExerciseComments from 'app/components/courses/exercise-comments';

export default function Exercise({
    index,
    user,
    exercise,
    assignments,
    showMenu,
    showRemoveFromAssignment,
    onProgressChange,
    onAddToAssignment,
    onAddToNewAssignment,
    onRemoveFromAssignment,
    onComplete
}) {
    const [state, setState] = useState(exercise.state || {});
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [isCommenting, toggleCommenting] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);
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

    const handleAddToAssignment = useCallback((event, assignment) => {
        event.stopPropagation();
        onAddToAssignment(exercise, assignment);
    }, [exercise, onAddToAssignment]);

    const handleAddToNewAssignment = useCallback(event => {
        event.stopPropagation();
        onAddToNewAssignment(exercise);
    }, [exercise, onAddToNewAssignment]);

    const handleRemoveFromAssignment = useCallback((event, assignment) => {
        event.stopPropagation();
        onRemoveFromAssignment(exercise, assignment);
    }, [exercise, onRemoveFromAssignment]);

    // const handleCreateComment = useCallback((_, data) => {
    //     return onCreateComment(exercise.id, data)
    //         .then(() => toggleCommenting(false));
    // }, [exercise]);

    // const handleUpdateComment = useCallback((commentId, data) => {
    //     return onUpdateComment(exercise.id, commentId, data);
    // }, [exercise]);

    // const handleDeleteComment = useCallback(commentId => {
    //     return onDeleteComment(exercise.id, commentId);
    // }, [exercise]);

    const hasSaveableItems = user.role === 'learner' && exercise.items.some(item =>
        item.type === 'essay' ||
        item.type === 'fib' ||
        item.type === 'input'
    );

    const hasCheckableItems = exercise.items.some(item =>
        item.type === 'fib' ||
        (item.type === 'input' && item.items?.length > 0)
    );

    console.log('Exercise', exercise);

    return (
        <Card className="Exercise">
            <header className="Exercise__header" onClick={toggleCollapsed}>
                <Avatar
                    content={index + 1}
                    color={exercise.completed ? 'primary' : undefined}
                    size="sm"
                />

                <Content
                    content={exercise.description}
                    html
                />

                <Flex alignItems="center" alignSelf="start" gap="small">
                    {assignments?.length > 0 && (
                        <Flex alignItems="center" gap="smaller">
                            {assignments
                                .filter(assignment => assignment.exerciseIds.includes(exercise.id))
                                .map(assignment =>
                                    <Chip
                                        key={assignment.id}
                                        content={assignment.title}
                                        color="primary"
                                        size="sm"
                                        slotProps={{
                                            action: {
                                                component: Link,
                                                to: assignment.url
                                            }
                                        }}
                                        end={showMenu &&
                                            <Chip.Delete
                                                variant="plain"
                                                title="Убрать из задания"
                                                onClick={event => handleRemoveFromAssignment(event, assignment)}
                                            >
                                                <Icon name="remove" size="small" />
                                            </Chip.Delete>
                                        }
                                    />
                                )
                            }
                        </Flex>
                    )}

                    {showMenu &&
                        <MenuButton
                            trigger={
                                <IconButton
                                    icon="assignment_add"
                                    title="Добавить в задание"
                                    onClick={event => event.stopPropagation()}
                                />
                            }
                            items={(assignments || [])
                                .filter(assignment => !assignment.exerciseIds.includes(exercise.id))
                                .map(assignment => ({
                                    key: assignment.id,
                                    content: assignment.title,
                                    onClick: event => handleAddToAssignment(event, assignment)
                                }))
                                .concat({
                                    key: 'new',
                                    content: 'Новое задание',
                                    onClick: event => handleAddToNewAssignment(event)
                                })
                            }
                        />
                    }

                    {showRemoveFromAssignment &&
                        <IconButton
                            icon="remove"
                            title="Удалить из задания"
                            onClick={handleRemoveFromAssignment}
                        />
                    }
                </Flex>
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