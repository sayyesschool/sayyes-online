import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useBoolean } from 'shared/hooks/state';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import ExerciseCard from 'app/components/courses/exercise-card';

import './index.scss';

export default function ExercisePage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [isFormOpen, toggleFormOpen] = useBoolean(true);

    const handleUpdateExercise = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, exercise]);

    const handleDeleteExercise = useCallback(() => {
        if (confirm('Удалить упражнение?')) {
            return actions.deleteExercise(course.id, exercise.id)
                .then(() => history.push(lesson.url));
        }
    }, [course, lesson, exercise]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);
    const exercise = course.exercisesById.get(match.params.exerciseId);

    return (
        <Page id="exercise-page">
            <PageTopBar
                breadcrumbs={[
                    <Link to={course.uri}>{course.title}</Link>,
                    <Link to={unit.uri}>{unit.title}</Link>,
                    <Link to={lesson.uri}>{lesson.title}</Link>
                ]}
                title={exercise.title}
                actions={[
                    {
                        key: 'edit',
                        icon: 'edit',
                        title: 'Редактировать упражнение',
                        onClick: toggleFormOpen
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
                <Exercise
                    course={course}
                    exercise={exercise}
                    onUpdate={handleUpdateExercise}
                    onDelete={handleDeleteExercise}
                />
            </PageContent>
        </Page>
    );
}