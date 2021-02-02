import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ExerciseDetails from 'app/components/courses/exercise-details';
import ExerciseForm from 'app/components/courses/exercise-form';

import './index.scss';

export default function ExercisePage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateExercise = useCallback(data => {
        actions.updateExercise(course.id, exercise.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, exercise]);

    const handleDeleteExercise = useCallback(() => {
        if (confirm('Удалить упражнение?')) {
            actions.deleteExercise(course.id, exercise.id)
                .then(() => history.push(lesson.url));
        }
    }, [course, lesson, exercise]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);
    const exercise = course.exercisesById.get(match.params.exerciseId);

    return (
        <Page id="lesson-page">
            <PageHeader
                title={
                    <>
                        <Link to={course.url}>{course.title}</Link>
                        <Link to={unit.url}>{unit.title}</Link>
                        <Link to={lesson.url}>{lesson.title}</Link>
                        Упражнение {exercise.number}
                    </>
                }
                actions={[
                    {
                        key: 'edit',
                        icon: 'edit',
                        title: 'Редактировать упражнение',
                        onClick: () => setExerciseFormOpen(true)
                    },
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить упражнение',
                        onClick: handleDeleteExercise
                    }
                ]}
            />

            <PageContent>
                <ExerciseDetails
                    exercise={exercise}
                />
            </PageContent>

            {/* <FormDialog
                title="Редактирование упражнения"
                form="exercise-form"
                open={isExerciseFormOpen}
                onClose={() => setExerciseFormOpen(false)}
            >
                <ExerciseForm
                    exercise={exercise}
                    course={course}
                    onSubmit={handleUpdateExercise}
                />
            </FormDialog> */}
        </Page>
    );
}