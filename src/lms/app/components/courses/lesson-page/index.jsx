import { useCallback } from 'react';

import { useAssignments } from 'shared/hooks/assignments';
import { useCourse } from 'shared/hooks/courses';
import { useUser } from 'shared/hooks/user';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import LessonContent from 'lms/components/courses/lesson-content';

import './index.scss';

export default function LessonPage({ match, location }) {
    const [course, actions] = useCourse(match.params.course, location.search);
    const [assignments, assignmentActions] = useAssignments({ enrollmentId: course?.enrollmentId });
    const [user] = useUser();

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
            exercises: [...assignment.exercises, exercise.id]
        });
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
                    onRemoveExerciseFromAssignment={handleRemoveExerciseFromAssignment}
                />
            </Page.Content>
        </Page>
    );
}