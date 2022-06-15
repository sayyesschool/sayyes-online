import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Flex } from '@fluentui/react-northstar';

import { useCourse } from 'shared/hooks/courses';
import IconButton from 'shared/components/icon-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSection from 'shared/components/page-section';
import ExerciseContentCard from 'shared/components/exercise-content-card';
import ExerciseComments from 'shared/components/exercise-comments';
import ExercisesList from 'shared/components/exercises-list';

import './index.scss';

export default function LessonPage({ match }) {
    const [course, actions] = useCourse(match.params.course);

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

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsBySlug.get(match.params.unit);
    const lesson = course.lessonsBySlug.get(match.params.lesson);
    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));
    const exercise = exercises[exerciseIndex];

    if (!exercise) return <LoadingIndicator />;

    return (
        <Page ref={rootRef} className="lesson-page">
            <PageHeader
                overline="Урок"
                title={lesson.title}
                breadcrumbs={[
                    <Link to={course.url}>{course.title}</Link>,
                    <Link to={unit.url}>{unit.title}</Link>
                ]}
                actions={[
                    <IconButton
                        icon="format_list_bulleted"
                        onClick={() => openSideSheet('contents')}
                    />,
                    (lesson.audios?.length > 0 &&
                        <IconButton
                            icon="audiotrack"
                            onClick={() => openSideSheet('audio')}
                        />
                    ),
                    (lesson.videos?.length > 0 &&
                        <IconButton
                            icon="movie"
                            onClick={() => openSideSheet('video')}
                        />
                    )
                ]}
                pullContent
            />

            <PageContent>
                <Grid>
                    <Flex column>
                        <ExerciseContentCard
                            exercise={exercise}
                            onProgressChange={handleExerciseProgressChange}
                        />

                        <ExerciseComments
                            exercise={exercise}
                            onCreate={handleCreateComment}
                            onUpdate={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    </Flex>

                    <PageSection className="lesson-exercises" title="Упражнения">
                        <ExercisesList
                            exercises={exercises}
                            selectedExerciseIndex={exerciseIndex}
                            onSelect={handleSelectExercise}
                        />
                    </PageSection>
                </Grid>
            </PageContent>
        </Page>
    );
}