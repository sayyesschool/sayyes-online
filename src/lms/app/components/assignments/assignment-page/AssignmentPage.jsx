import { useCallback } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { StatusColor, StatusLabel } from 'shared/data/assignment';
import { DomainLabel } from 'shared/data/common';
import { useAssignment } from 'shared/hooks/assignments';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import datetime from 'shared/libs/datetime';
import { Heading, Surface, Text } from 'shared/ui-components';

import Exercise from 'lms/components/courses/exercise';

export default function AssignmentPage({ match, location, history }) {
    const [assignment, actions] = useAssignment(match.params.id, location.search);
    const [user] = useUser();

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: assignment.enrollmentId,
            courseId: exercise.courseId,
            exerciseId: exercise.id
        });
    }, [assignment, actions]);

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

    if (!assignment) return <LoadingIndicator />;

    const isTeacher = user.role === 'teacher';
    const isLearner = user.role === 'learner';

    return (
        <Page className="AssignmentPage">
            <Page.Header
                breadcrumbs={[
                    {
                        content: DomainLabel[assignment.enrollment.domain],
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
                description={
                    <Text
                        content="Дата выполнения:"
                        end={
                            <Text
                                content={datetime(assignment.dueAt).calendar()}
                                variant="soft"
                                type="body-sm"
                                fontWeight="lg"
                            />
                        }
                    />
                }
                actions={
                    isTeacher && [
                        {
                            key: 'delete',
                            icon: 'delete',
                            title: 'Удалить задание',
                            onClick: toggleConfirmationDialogOpen
                        }
                    ]
                    ||
                    isLearner && getLearnerAssignmentActions(assignment.status, updateAssignmentStatus)
                }
            />

            <Page.Content>
                {
                    isTeacher && (
                        <Surface variant="outlined">
                            <ContentEditor
                                content={assignment.content}
                            />
                        </Surface>
                    )
                    ||
                    isLearner && assignment.content && (
                        <Content
                            content={assignment.content}
                            html
                        />
                    )
                }

                {assignment.exercises.length > 0 ? assignment.exercises.map((exercise, index) =>
                    <Exercise
                        key={exercise.id}
                        index={index}
                        user={user}
                        exercise={exercise}
                        showRemoveFromAssignment={user.role === 'teacher'}
                        onRemoveFromAssignment={handleRemoveExercise}
                        onProgressChange={handleExerciseProgressChange}
                    />
                ) : (
                    <>
                        <Text content="Нет упражнений" />

                        <Text
                            content="Добавьте упражнения в задание на странице курса"
                            type="body-sm"
                        />
                    </>
                )}
            </Page.Content>

            <ConfirmationDialog
                title="Удалить упражнение?"
                message="Упражнение будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onClose={toggleConfirmationDialogOpen}
                onConfirm={handleDelete}
            />
        </Page>
    );
}

function getLearnerAssignmentActions(status, onClick) {
    switch (status) {
        case 'assigned': return [{
            key: 'turn-in',
            icon: 'assignment_return',
            content: 'Сдать на проверку',
            color: 'primary',
            onClick: () => onClick('submitted')
        }];
        case 'submitted': return [{
            key: 'turn-in',
            icon: 'assignment_return',
            content: 'Отменить сдачу',
            variant: 'soft',
            color: 'primary',
            onClick: () => onClick('assigned')
        }];
        case 'completed': return [];
    }
}