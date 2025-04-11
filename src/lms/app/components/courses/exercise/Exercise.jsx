import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Content from 'shared/components/content';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useExercise } from 'shared/hooks/exercises';
import { useBoolean } from 'shared/hooks/state';
import {
    Avatar,
    Button,
    Chip,
    Flex,
    Icon,
    IconButton,
    Menu,
    Skeleton,
    Surface
} from 'shared/ui-components';

import ExerciseComments from 'lms/components/courses/exercise-comments';
import ExerciseContent from 'lms/components/courses/exercise-content';

import styles from './Exercise.module.scss';

export default function Exercise({
    index,
    user,
    id,
    assignments,
    showMenu,
    showRemoveFromAssignment,
    onProgressChange,
    onAddToAssignment,
    onAddToNewAssignment,
    onRemoveFromAssignment,
    onComplete
}) {
    const [exercise] = useExercise(id);

    const [state, setState] = useState(exercise?.state || {});
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    // const [isCommenting, toggleCommenting] = useBoolean(false);
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
    //     return actions.createComment({...data, itemId: exercise?.id})
    //         .then(() => toggleCommenting(false));
    // }, [actions, exercise, toggleCommenting]);

    // const handleUpdateComment = useCallback((commentId, data) => {
    //     return actions.updateComment(commentId, data);
    // }, [actions]);

    // const handleDeleteComment = useCallback(commentId => {
    //     return actions.deleteComment(commentId);
    // }, [actions]);

    const hasSaveableItems = user.isLearner && exercise?.items.some(item =>
        item.type === 'essay' ||
        item.type === 'fib' ||
        item.type === 'input'
    );

    const hasCheckableItems = exercise?.items.some(item =>
        item.type === 'fib' ||
        (item.type === 'input' && item.items?.length > 0)
    );

    if (!exercise) return (
        <Skeleton
            width="100%"
            height="80px"
            animation="wave"
            variant="rectangular"
            radius="md"
        />
    );

    return (
        <Surface
            className={styles.root}
            padding="md"
            shadow="sm"
        >
            <div className={styles.header} onClick={toggleCollapsed}>
                <Avatar
                    content={index + 1}
                    color={exercise.completed ? 'primary' : undefined}
                    size="sm"
                />

                <Content
                    className={styles.description}
                    content={exercise.description}
                    html
                />

                <Flex
                    alignItems="center"
                    alignSelf="start"
                    gap="small"
                >
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
                        <Menu
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
            </div>

            {!isCollapsed &&
                <div className={styles.content}>
                    <ExerciseContent
                        exercise={exercise}
                        state={state}
                        checked={isChecked}
                        disabled={user.isTeacher}
                        onUpdateState={handleUpdateState}
                    />

                    <Flex gap="sm">
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

                        {user.isTeacher &&
                            <Button
                                content={exercise.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
                                icon={exercise.completed ? 'task_alt' : undefined}
                                variant="outlined"
                                disabled={isSaving}
                                onClick={handleComplete}
                            />
                        }
                    </Flex>

                    {/* TODO: решили убрать коментарии из упражнений и оставить для задания */}
                    {/* <ExerciseComments
                    exercise={exercise}
                    onCreate={handleCreateComment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                /> */}
                </div>
            }
        </Surface>
    );
}