import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Content from 'shared/components/content';
import { useExercise } from 'shared/hooks/exercises';
import { useBoolean } from 'shared/hooks/state';
import {
    Avatar,
    Badge,
    Button,
    Chip,
    Flex,
    Icon,
    IconButton,
    Menu,
    Skeleton,
    Surface
} from 'shared/ui-components';

import ExerciseContent from 'lms/components/courses/exercise-content';

import styles from './Exercise.module.scss';

const getBadgeIcon = ({ completed, checked } = {}) => {
    if (completed && checked) return 'done_all';
    if (completed) return 'done';
    if (checked) return 'done_outline';

    return null;
};

export default function Exercise({
    index,
    user,
    id,
    enrollmentId,
    assignments,
    showMenu,
    showRemoveFromAssignment,
    onProgressChange,
    onAddToAssignment,
    onAddToNewAssignment,
    onRemoveFromAssignment
}) {
    const query = useMemo(() => enrollmentId ? { enrollmentId } : {}, [enrollmentId]);
    const [exercise] = useExercise({ id, query });
    const [state, setState] = useState(exercise?.progress?.state || {});
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [isSaving, setSaving] = useBoolean(false);

    const badgeIcon = getBadgeIcon(exercise);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state })
            .finally(() => setSaving(false));
    }, [setSaving, onProgressChange, exercise, state]);

    const handleComplete = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { completed: !exercise?.completed })
            .finally(() => setSaving(false));
    }, [exercise, onProgressChange, setSaving]);

    const handleChecked = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { checked: !exercise?.checked })
            .finally(() => setSaving(false));
    }, [exercise, onProgressChange, setSaving]);

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

    useEffect(() => {
        if (exercise.progress) {
            setState(exercise.progress.state || {});
        }
    }, [exercise.progress]);

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
                <Badge
                    content={badgeIcon && <Icon name={badgeIcon} size="small" />}
                    size="sm"
                >
                    <Avatar
                        content={index + 1}
                        size="sm"
                    />
                </Badge>

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
                            icon="highlight_off"
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
                        checked={false}
                        disabled={user.isTeacher}
                        onUpdateState={handleUpdateState}
                    />

                    <Flex gap="sm">
                        <Button
                            content="Сохранить"
                            icon="save"
                            variant="outlined"
                            disabled={isSaving}
                            onClick={handleSave}
                        />

                        {user.isLearner && (
                            <Button
                                content={
                                    exercise.completed ? 'Убрать из выполненых' : 'Выполнено'
                                }
                                icon={exercise.completed ? 'task_alt' : undefined}
                                variant="outlined"
                                disabled={isSaving}
                                onClick={handleComplete}
                            />
                        )}

                        {user.isTeacher && (
                            <Button
                                content={
                                    exercise.checked ? 'Убрать из проверенных' : 'Проверено'
                                }
                                icon={exercise.completed ? 'task_alt' : undefined}
                                variant="outlined"
                                disabled={isSaving}
                                onClick={handleChecked}
                            />
                        )}
                    </Flex>
                </div>
            }
        </Surface>
    );
}