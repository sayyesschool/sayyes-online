import { useCallback, useRef } from 'react';

import { useCourse } from 'shared/hooks/courses';
import { useUser } from 'shared/hooks/user';
import { Grid } from 'shared/ui-components';
import ExerciseContent from 'shared/components/exercise-content';
import ExercisesList from 'shared/components/exercises-list';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import './index.scss';

export default function ExercisePage({ match, location }) {
    const [user] = useUser();
    const [course, actions] = useCourse(match.params.course, location.search);

    const rootRef = useRef();

    const exercise = course?.exercisesById.get(match.params.exercise);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        console.log(course);
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollment: course.enrollmentId,
            course: course.id,
            exercise: exercise.id
        });
    }, [course, exercise]);

    if (!exercise) return <LoadingIndicator />;

    const lesson = course?.lessonsById.get(exercise.lessonId);
    const unit = course?.unitsById.get(exercise.unitId);

    return (
        <Page ref={rootRef} className="exercise-page">
            <Page.Header
                title={exercise.title}
                breadcrumbs={[
                    { url: course.uri, text: course.title },
                    { url: unit.uri, text: unit.title },
                    { url: lesson.uri, text: lesson.title },
                ]}
            />

            <Page.Content>
                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Page.Section>
                        <ExerciseContent
                            key={exercise.id}
                            user={user}
                            exercise={exercise}
                            onProgressChange={handleExerciseProgressChange}
                        />
                    </Page.Section>

                    <Page.Section title="Упражнения" compact>
                        <ExercisesList
                            course={course}
                            exercises={lesson.exercises}
                            selectedExercise={exercise}
                        />
                    </Page.Section>
                </Grid>
            </Page.Content>
        </Page>
    );
}