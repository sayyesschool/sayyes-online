import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';

import { useStore } from 'app/hooks/store';
import LessonDetails from 'app/components/courses/lesson-details';
import Exercise from 'app/components/courses/exercise';
import ExerciseForm from 'app/components/courses/exercise-form';

import './index.scss';

export default function LessonPage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateLesson = useCallback(data => {
        actions.updateLesson(course.id, lesson.id, data);
    }, [course, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (confirm('Удалить урок?')) {
            actions.deleteLesson(course.id, lesson.id)
                .then(() => history.push(unit.url));
        }
    }, [course, unit, lesson]);

    const handleCreateExercise = useCallback(data => {
        data._unit = unit.id;
        data._lesson = lesson.id;

        actions.createExercise(course.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, unit, lesson]);

    const handleUpdateExercise = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, exercise]);

    const handleDeleteExercise = useCallback(exercise => {
        if (confirm('Удалить упражнение?')) {
            actions.deleteExercise(course.id, exercise.id)
                .then(() => history.push(lesson.url));
        }
    }, [course, lesson, exercise]);

    const toggleExerciseForm = useCallback(() => {
        setExerciseFormOpen(value => !value);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);
    const exercise = course.exercisesById.get(match.params.exerciseId);

    return (
        <Page id="lesson-page">
            <PageHeader
                breadcrumbs={[
                    <Link to={course.url}>{course.title}</Link>,
                    <Link to={unit.url}>{unit.title}</Link>
                ]}
                title={lesson.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: handleDeleteLesson
                    }
                ]}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="6">
                        <LessonDetails
                            lesson={lesson}
                            exercise={exercise}
                            onUpdate={handleUpdateLesson}
                            onAddExercise={toggleExerciseForm}
                            onDeleteExercise={handleDeleteExercise}
                        />
                    </LayoutGrid.Cell>

                    {exercise &&
                        <LayoutGrid.Cell span="6">
                            <Exercise
                                course={course}
                                exercise={exercise}
                                onUpdate={handleUpdateExercise}
                                onDelete={handleDeleteExercise}
                            />
                        </LayoutGrid.Cell>
                    }
                </LayoutGrid>
            </PageContent>

            <FormDialog
                title="Новое упражнение"
                form="exercise-form"
                open={isExerciseFormOpen}
                onClose={toggleExerciseForm}
            >
                <ExerciseForm
                    course={course}
                    onSubmit={handleCreateExercise}
                />
            </FormDialog>
        </Page>
    );
}