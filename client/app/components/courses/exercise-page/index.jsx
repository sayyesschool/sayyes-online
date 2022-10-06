import { useCallback, useRef } from 'react';
import { Grid } from '@fluentui/react-northstar';

import { useCourse } from 'shared/hooks/courses';
import IconButton from 'shared/ui-components/icon-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import ExerciseContent from 'shared/components/exercise-content';
import ExercisesList from 'shared/components/exercises-list';

import './index.scss';

export default function ExercisePage({ match }) {
    const [course, actions] = useCourse(match.params.course);

    const rootRef = useRef();

    const exercise = course?.exercisesById.get(match.params.exercise);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(course.id, exercise.id, data);
    }, [course, exercise]);

    if (!exercise) return <LoadingIndicator />;

    const lesson = course?.lessonsById.get(exercise.lessonId);
    const unit = course?.unitsById.get(exercise.unitId);

    return (
        <Page ref={rootRef} className="exercise-page">
            <Page.Header
                title={lesson.title}
                breadcrumbs={[
                    { url: course.uri, text: course.title },
                    { url: unit.uri, text: unit.title },
                    { url: lesson.uri, text: lesson.title },
                ]}
                actions={
                    <IconButton
                        icon="format_list_bulleted"
                        onClick={() => openSideSheet('contents')}
                        iconOnly
                        text
                    />
                }
            />

            <Page.Content>
                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Page.Section>
                        <ExerciseContent
                            exercise={exercise}
                            onProgressChange={handleExerciseProgressChange}
                        />
                    </Page.Section>

                    <Page.Section title="Упражнения" compact>
                        <ExercisesList
                            exercises={lesson.exercises}
                        />
                    </Page.Section>
                </Grid>
            </Page.Content>
        </Page>
    );
}