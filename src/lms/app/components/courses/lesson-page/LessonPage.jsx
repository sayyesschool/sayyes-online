import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useAssignments } from 'shared/hooks/assignments';
import { useCourse } from 'shared/hooks/courses';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useUser } from 'shared/hooks/user';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import AssignmentForm from 'lms/components/assignments/assignment-form';
import LessonContent from 'lms/components/courses/lesson-content';

export default function LessonPage({ match, location }) {
    const [course, actions] = useCourse(match.params.course, location.search);
    const [enrollment] = useEnrollment(course?.enrollmentId);
    const [assignments, assignmentActions] = useAssignments({ enrollmentId: course?.enrollmentId });
    const [user] = useUser();

    const [exerciseIdForNewAssignment, setExerciseIdForNewAssignment] = useState();
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);

    const handleSubmitAssignment = useCallback((data) => {
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
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: course.enrollmentId,
            courseId: course.id,
            exerciseId: exercise.id
        });
    }, [course]);

    const handleAddExerciseToAssignment = useCallback((exercise, assignment) => {
        return assignmentActions.updateAssignment(assignment.id, {
            exerciseIds: [...assignment.exerciseIds, exercise.id]
        });
    }, []);

    const handleAddExerciseToNewAssignment = useCallback((exercise) => {
        setExerciseIdForNewAssignment(exercise.id);
        toggleFormDialogOpen(true);
    }, []);

    const handleRemoveExerciseFromAssignment = useCallback((exercise, assignment) => {
        return assignmentActions.updateAssignment(assignment.id, {
            exercises: assignment.exercises.filter(id => id !== exercise.id)
        });
    }, []);

    const lesson = course?.lessonsById.get(match.params.lesson);
    const unit = course?.unitsById.get(lesson.unitId);

    if (!lesson) return <LoadingIndicator />;

    return (
        <Page className="LessonPage">
            <Page.Header
                title={lesson.title}
                breadcrumbs={[
                    { to: course.uri, content: course.title },
                    { to: unit.uri, content: unit.title }
                ]}
            />

            <Page.Content>
                <LessonContent
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
    );
}