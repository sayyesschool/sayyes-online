import { useCallback, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useCourse } from 'shared/hooks/courses';
import Exercise from 'shared/components/exercise';
import ExerciseComments from 'shared/components/exercise-comments';
import ExercisesList from 'shared/components/exercises-list';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Grid, Flex, IconButton } from 'shared/ui-components';

import './index.scss';

export default function LessonPage({ match, location }) {
    const [course, actions] = useCourse(match.params.course, location.search);

    const rootRef = useRef();

    const [exerciseIndex, setExerciseIndex] = useState(0);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(course.id, exercise.id, data);
    }, [course]);

    const handleSelectExercise = useCallback((exercise, index) => {
        setExerciseIndex(index);
    }, []);

    const handleCreateComment = useCallback(() => { }, []);

    const handleUpdateComment = useCallback(() => { }, []);

    const handleDeleteComment = useCallback(() => { }, []);

    const lesson = course?.lessonsById.get(match.params.lesson);
    const unit = course?.unitsById.get(lesson.unitId);
    const exercise = lesson?.exercises.at(exerciseIndex);

    if (!lesson) return <LoadingIndicator />;

    return <Redirect to={exercise.uri + (course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '')} />;

    return (
        <Page ref={rootRef} className="lesson-page">
            <Page.Header
                title={lesson.title}
                breadcrumbs={[
                    { url: course.uri, text: course.title },
                    { url: unit.uri, text: unit.title }
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
                    <Flex column gap="gap.medium">
                        <Page.Section>
                            <Exercise
                                exercise={exercise}
                                onProgressChange={handleExerciseProgressChange}
                            />
                        </Page.Section>

                        <Page.Section title="Комментарии">
                            <ExerciseComments
                                exercise={exercise}
                                onCreate={handleCreateComment}
                                onUpdate={handleUpdateComment}
                                onDelete={handleDeleteComment}
                            />
                        </Page.Section>
                    </Flex>

                    <Page.Section className="lesson-exercises" title="Упражнения" compact>
                        <ExercisesList
                            exercises={lesson.exercises}
                            selectedExerciseIndex={exerciseIndex}
                            onSelect={handleSelectExercise}
                        />
                    </Page.Section>
                </Grid>
            </Page.Content>
        </Page>
    );
}