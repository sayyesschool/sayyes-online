import { useCallback, useRef } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { StatusColor, StatusLabel } from 'shared/data/assignment';
import { DomainLabel } from 'shared/data/common';
import { useAssignment } from 'shared/hooks/assignments';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useExercises } from 'shared/hooks/exercises';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import datetime from 'shared/libs/datetime';
import { Alert, Heading, Icon, Text } from 'shared/ui-components';

import Exercise from 'lms/components/courses/exercise';
import { LearnerContextProvider } from 'lms/contexts/learner';

import styles from './AssignmentPage.module.scss';

export default function AssignmentPage({ match, location, history }) {
    const [user] = useUser();
    const [assignment, actions] = useAssignment(match.params.id);
    const [enrollment] = useEnrollment(assignment?.enrollment.id);
    const [exercisesMap, exerciseActions] = useExercises();
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const editorRef = useRef();

    const isTeacher = user.isTeacher;
    const isLearner = user.isLearner;
    const hasExercises = assignment?.exercises?.length > 0;
    const assignmentExercises = assignment?.exerciseIds.map(id => exercisesMap?.[id]);
    const isAllChecked = assignmentExercises?.every(ex => ex.isChecked);
    const isAllCompleted = assignmentExercises?.every(ex => ex.isCompleted);
    const showAllCheckedAlert = isTeacher && isAllChecked && assignment?.status !== 'completed';

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return exerciseActions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: assignment.enrollmentId,
            courseId: exercise.courseId,
            exerciseId: exercise.id
        });
    }, [assignment, exerciseActions]);

    const updateAssignmentStatus = useCallback(status => {
        return actions.updateAssignment(assignment.id, { status });
    }, [assignment, actions]);

    const handleRemoveExercise = useCallback(exercise => {
        return actions.updateAssignment(assignment.id, {
            exerciseIds: assignment.exerciseIds.filter(id => id !== exercise.id)
        });
    }, [assignment, actions]);

    const handleDelete = useCallback(() => {
        return actions.deleteAssignment(assignment.id)
            .then(() => {
                toggleConfirmationDialogOpen();
                history.push(`/enrollments/${assignment.enrollmentId}`);
            });
    }, [assignment, actions, history, toggleConfirmationDialogOpen]);

    const handleSave = useCallback(() => {
        const data = { content: editorRef.current.getData() };

        return actions.updateAssignment(assignment.id, data);
    }, [assignment, actions]);

    if (!assignment) return <LoadingIndicator />;

    return (
        <LearnerContextProvider learnerId={enrollment?.learnerId}>
            <Page className={styles.root} layout="narrow">
                <Page.Header
                    breadcrumbs={[
                        {
                            content: DomainLabel[assignment.enrollment?.domain],
                            to: `/enrollments/${assignment.enrollmentId}`
                        }
                    ]}
                    title={
                        <Heading
                            content={assignment.title}
                            end={
                                <Text
                                    content={StatusLabel[assignment.status]}
                                    color={StatusColor[assignment.status]}
                                    variant="soft"
                                    type="body-sm"
                                />
                            }
                        />
                    }
                    description={assignment.dueDate &&
                        <Text
                            content="Дата выполнения:"
                            end={
                                <Text
                                    content={datetime(assignment.dueDate).calendar()}
                                    variant="soft"
                                    type="body-sm"
                                    fontWeight="lg"
                                />
                            }
                        />
                    }
                    actions={
                        (isLearner &&
                        getLearnerAssignmentActions(
                            assignment.status,
                            updateAssignmentStatus,
                            isAllCompleted
                        )) ||
                    (isTeacher &&
                        getTeacherAssignmentActions(
                            assignment.status,
                            updateAssignmentStatus,
                            handleSave,
                            toggleConfirmationDialogOpen,
                            isAllChecked
                        ))
                    }
                />

                {showAllCheckedAlert && (
                    <Alert
                        start={<Icon name="checklist" />}
                        content="Все задания проверены"
                        variant="soft"
                        color="success"
                    />
                )}

                <Page.Content>
                    <Page.Section compact>
                        {
                            isTeacher && (
                                <ContentEditor
                                    ref={editorRef}
                                    content={assignment.content}
                                />
                            )
                        ||
                        isLearner && assignment.content && (
                            <Content
                                content={assignment.content}
                                className={styles.description}
                                html
                            />
                        )
                        }
                    </Page.Section>

                    <Page.Section
                        title={hasExercises ? 'Упражнения' : 'Нет упражнений'}
                        description={!hasExercises && 'Добавьте упражнения в задание на странице курса'}
                        compact
                        plain
                    >
                        {assignment.exercises?.map((exercise, index) =>
                            <Exercise
                                key={exercise.id}
                                id={exercise.id}
                                index={index}
                                user={user}
                                showRemoveFromAssignment={isTeacher}
                                onRemoveFromAssignment={handleRemoveExercise}
                                onProgressChange={handleExerciseProgressChange}
                            />
                        )}
                    </Page.Section>
                </Page.Content>

                <ConfirmationDialog
                    title="Удалить упражнение?"
                    message="Упражнение будет удален без возможности восстановления."
                    open={isConfirmationDialogOpen}
                    onClose={toggleConfirmationDialogOpen}
                    onConfirm={handleDelete}
                />
            </Page>
        </LearnerContextProvider>
    );
}

function getLearnerAssignmentActions(status, onClick, isAllCompleted) {
    switch (status) {
        case 'assigned': return [{
            key: 'turn-in',
            icon: 'assignment_return',
            content: 'Сдать на проверку',
            color: 'primary',
            disabled: !isAllCompleted,
            onClick: () => onClick('submitted')
        }];
        case 'submitted': return [{
            key: 'turn-in',
            icon: 'assignment_return',
            content: 'Отменить сдачу',
            variant: 'soft',
            color: 'primary',
            disabled: isAllCompleted,
            onClick: () => onClick('assigned')
        }];
        case 'completed': return [];
    }
}

function getTeacherAssignmentActions(
    status,
    onClick,
    handleSave,
    toggleConfirmationDialogOpen,
    isAllChecked
) {
    const baseActions = [
        {
            key: 'save',
            icon: 'save',
            title: 'Сохранить задание',
            onClick: handleSave
        }, {
            key: 'delete',
            icon: 'delete',
            color: 'danger',
            title: 'Удалить задание',
            onClick: toggleConfirmationDialogOpen
        }
    ];

    status === 'assigned' ?
        baseActions.push({
            key: 'turn-in',
            icon: 'verified',
            content: 'Отметить выполненным',
            color: 'primary',
            disabled: !isAllChecked,
            onClick: () => onClick('completed')
        }) :
        baseActions.push({
            key: 'turn-in',
            icon: 'unpublished',
            content: 'Вернуть в работу',
            variant: 'soft',
            color: 'primary',
            disabled: isAllChecked,
            onClick: () => onClick('assigned')
        });

    return baseActions;
}