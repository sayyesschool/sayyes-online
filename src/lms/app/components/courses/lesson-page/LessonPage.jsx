import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useAssignments } from 'shared/hooks/assignments';
import { useCourse } from 'shared/hooks/courses';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useExerciseActions } from 'shared/hooks/exercises';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { Text } from 'shared/ui-components';

import AssignmentForm from 'lms/components/assignments/assignment-form';
import LessonContent from 'lms/components/courses/lesson-content';
import { LearnerContextProvider } from 'lms/contexts/learner';

export default function LessonPage({ match, location }) {
    const [course] = useCourse(match.params.course, location.search);
    const exerciseActions = useExerciseActions();
    const [enrollment] = useEnrollment(course?.enrollmentId);
    const assignmentsQuery = course?.enrollmentId ?
        { enrollmentId: course?.enrollmentId } :
        null;
    const [assignments, assignmentActions] = useAssignments(assignmentsQuery);
    const [user] = useUser();

    const [exerciseIdForNewAssignment, setExerciseIdForNewAssignment] = useState();
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);

    const handleSubmitAssignment = useCallback(data => {
        return assignmentActions.createAssignment({
            ...data,
            enrollmentId: enrollment.id,
            learnerId: enrollment.learnerId,
            teacherId: enrollment.teacherId,
            exerciseIds: [exerciseIdForNewAssignment]
        }).finally(() => {
            toggleFormDialogOpen(false);
            setExerciseIdForNewAssignment(undefined);
        });
    }, [enrollment, exerciseIdForNewAssignment]);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return exerciseActions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: course.enrollmentId,
            courseId: course.id,
            exerciseId: exercise.id
        });
    }, [course?.enrollmentId, course?.id, exerciseActions]);

    const handleAddExerciseToAssignment = useCallback((exercise, assignment) => {
        return assignmentActions.updateAssignment(assignment.id, {
            exerciseIds: [...assignment.exerciseIds, exercise.id]
        });
    }, []);

    const handleAddExerciseToNewAssignment = useCallback(exercise => {
        setExerciseIdForNewAssignment(exercise.id);
        toggleFormDialogOpen(true);
    }, []);

    const handleRemoveExerciseFromAssignment = useCallback((exercise, assignment) => {
        return assignmentActions.updateAssignment(assignment.id, {
            exerciseIds: assignment.exerciseIds.filter(id => id !== exercise.id)
        });
    }, []);

    const lesson = course?.lessonsById.get(match.params.lesson);
    const unit = course?.unitsById.get(lesson.unitId);

    if (!enrollment || !lesson) return <LoadingIndicator />;

    const query = enrollment?.id ? `?enrollmentId=${enrollment.id}` : '';

    return (
        <LearnerContextProvider learnerId={enrollment.learnerId}>
            <Page className="LessonPage">
                <Page.Header
                    breadcrumbs={[
                        { to: course.uri + query, content: course.title },
                        { to: unit.uri + query, content: unit.title }
                    ]}
                    title={lesson.title}
                    description={lesson.description &&
                        <Text type="body-md">
                            <span dangerouslySetInnerHTML={{ __html: lesson.description }}/>
                        </Text>
                    }
                />

                <Page.Content>
                    <LessonContent
                        enrollmentId={enrollment.id}
                        lesson={lesson}
                        assignments={assignments}
                        user={user}
                        onExerciseProgressChange={handleExerciseProgressChange}
                        onAddExerciseToAssignment={handleAddExerciseToAssignment}
                        onAddExerciseToNewAssignment={handleAddExerciseToNewAssignment}
                        onRemoveExerciseFromAssignment={handleRemoveExerciseFromAssignment}
                    />
                </Page.Content>

                <FormDialog
                    title="Новое задание"
                    open={isFormDialogOpen}
                    onClose={toggleFormDialogOpen}
                >
                    <AssignmentForm
                        id="new-assignment-form"
                        onSubmit={handleSubmitAssignment}
                    />
                </FormDialog>
            </Page>
        </LearnerContextProvider>
    );
}