import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useAssignment } from 'shared/hooks/assignments';
import { useUser } from 'shared/hooks/user';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Heading, Surface, Text } from 'shared/ui-components';
import datetime from 'shared/libs/datetime';
import { StatusColor, StatusLabel } from 'shared/data/assignment';

import Exercise from 'lms/components/courses/exercise';

export default function AssignmentPage({ match, location }) {
    const [assignment, actions] = useAssignment(match.params.id, location.search);
    const [user] = useUser();

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: course.enrollmentId,
            courseId: course.id,
            exerciseId: exercise.id
        });
    }, []);

    const updateAssignmentStatus = useCallback((status) => {
        return actions.updateAssignment(assignment.id, { status });
    }, [assignment]);

    const handleDelete = useCallback(() => {
        return actions.deleteAssignment(assignment.id);
    }, [assignment]);

    if (!assignment) return <LoadingIndicator />;

    const isTeacher = user.role === 'teacher';
    const isLearner = user.role === 'client';

    return (
        <Page className="AssignmentPage">
            <Page.Header
                breadcrumbs={[
                    {
                        content: assignment.enrollment.domainLabel,
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
                    (isTeacher && [
                        {
                            key: 'delete',
                            icon: 'delete',
                            title: 'Удалить задание',
                            onClick: toggleConfirmationDialogOpen
                        }
                    ])
                    ||
                    (isLearner && getLearnerAssignmentActions(assignment.status, updateAssignmentStatus))
                }
            />

            <Page.Content>
                {assignment.content &&
                    (isTeacher &&
                        <Surface variant="outlined">
                            <ContentEditor
                                content={assignment.content}
                            />
                        </Surface>
                    )
                    ||
                    (isLearner &&
                        <Content
                            content={assignment.content}
                            html
                        />
                    )
                }

                {assignment.exercises.map((exercise, index) =>
                    <Exercise
                        key={exercise.id}
                        index={index}
                        user={user}
                        exercise={exercise}
                        showRemoveFromAssignment={user.role === 'teacher'}
                        onProgressChange={handleExerciseProgressChange}
                    />
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