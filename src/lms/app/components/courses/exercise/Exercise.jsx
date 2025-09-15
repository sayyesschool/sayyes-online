import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

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
import ExerciseNotes from 'lms/components/courses/exercise-notes';

import styles from './Exercise.module.scss';

const interactiveItems = ['input', 'fib', 'boolean', 'choice'];

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
    const [exercise] = useExercise(id, query);

    const [state, setState] = useState(exercise.state);
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
    const [showCorrectAnswers, setShowCorrectAnswers] = useBoolean(false);
    const [isSaving, setSaving] = useBoolean(false);
    const [initialized, setInitialized] = useState(false);

    const { isCompleted, isChecked } = exercise;
    const badgeIcon = isCompleted ? 'done' : isChecked ? 'done_all' : null;
    const isInteractive = exercise.items?.some(item => interactiveItems.includes(item.type));
    const showCorrectAnswersButton =
        isInteractive &&
        (isCompleted || isChecked) ||
        user.isTeacher;

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state })
            .finally(() => setSaving(false));
    }, [setSaving, onProgressChange, exercise, state]);

    const handleComplete = useCallback(() => {
        setSaving(true);
        setShowCorrectAnswers(false);

        const status = isCompleted ? 0 : 1;

        return onProgressChange(exercise, { status, state })
            .finally(() => setSaving(false));
    }, [exercise, isCompleted, onProgressChange, setSaving, setShowCorrectAnswers, state]);

    const handleChecked = useCallback(() => {
        setSaving(true);

        const status = isChecked ? 0 : 2;

        return onProgressChange(exercise, { status })
            .finally(() => setSaving(false));
    }, [exercise, isChecked, onProgressChange, setSaving]);

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
        if (!isEmpty(exercise.state) && !initialized) {
            setState(exercise.state);
            setInitialized(true);
        }
    }, [exercise, initialized]);

    useEffect(() => {
        if (!exercise || isEmpty(state) || isEqual(state, exercise.state)) return;

        const timeout = setTimeout(handleSave, 2000);

        return () => clearTimeout(timeout);
    }, [exercise, state, handleSave]);

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
            id={exercise.id}
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
                        checked={showCorrectAnswers}
                        readOnly={user.isTeacher || showCorrectAnswers}
                        onUpdateState={handleUpdateState}
                    />

                    {user.isTeacher && <ExerciseNotes exercise={exercise} />}

                    <Flex gap="sm">
                        {user.isLearner && exercise.status < 2 && (
                            <Button
                                content={isCompleted ? 'Убрать из выполненых' : 'Выполнено'}
                                icon={isCompleted ? undefined : 'task_alt'}
                                variant="outlined"
                                disabled={isSaving}
                                onClick={handleComplete}
                            />
                        )}

                        {user.isTeacher && (
                            <Button
                                content={isChecked ? 'Убрать из проверенных' : 'Проверено'}
                                icon={isChecked ? undefined : 'task_alt'}
                                variant="outlined"
                                disabled={isSaving}
                                onClick={handleChecked}
                            />
                        )}

                        {showCorrectAnswersButton && (
                            <Button
                                content={showCorrectAnswers ? 'Убрать ответы' : 'Показать ответы'}
                                variant="outlined"
                                onClick={setShowCorrectAnswers}
                            />
                        )}
                    </Flex>
                </div>
            }
        </Surface>
    );
}