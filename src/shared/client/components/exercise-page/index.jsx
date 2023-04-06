import { useCallback, useRef } from 'react';

import { useCourse } from 'shared/hooks/courses';
import { useUser } from 'shared/hooks/user';
import ExerciseContent from 'shared/components/exercise-content';
import ExercisesList from 'shared/components/exercises-list';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Grid } from 'shared/ui-components';

export default function ExercisePage({ match, location }) {
    const [user] = useUser();
    const [course, actions] = useCourse(match.params.course, location.search);

    const rootRef = useRef();

    const exercise = course?.exercisesById.get(match.params.exercise);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollment: course.enrollmentId,
            course: course.id,
            exercise: exercise.id
        });
    }, [course, exercise]);

    if (!exercise) return <LoadingIndicator fullscreen />;

    const lesson = course?.lessonsById.get(exercise.lessonId);
    const unit = course?.unitsById.get(exercise.unitId);

    return (
        <Page ref={rootRef} className="ExercisePage">
            <Page.Header
                title={exercise.title}
                breadcrumbs={[
                    { to: course.uri, content: course.title },
                    { to: unit.uri, content: unit.title },
                    { to: lesson.uri, content: lesson.title }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item lg={8}>
                        <Page.Section>
                            <ExerciseContent
                                key={exercise.id}
                                user={user}
                                exercise={exercise}
                                onProgressChange={handleExerciseProgressChange}
                            />
                        </Page.Section>
                    </Grid.Item>

                    <Grid.Item lg={4}>
                        <Page.Section title="Упражнения" compact>
                            <ExercisesList
                                course={course}
                                exercises={lesson.exercises}
                                selectedExercise={exercise}
                            />
                        </Page.Section>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}