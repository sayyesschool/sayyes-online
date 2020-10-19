import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormDialog from 'app/components/shared/form-dialog';
import LessonDetails from 'app/components/courses/lesson-details';
import LessonForm from 'app/components/courses/lesson-form';
import ExerciseForm from 'app/components/courses/exercise-form';
import { upload } from 'app/helpers/file';

import './index.scss';

export default function LessonPage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [activeExercise, setActiveExercise] = useState();
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);
    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateLesson = useCallback(data => {
        (data.file ?
            upload(data.file, {
                name: lesson.id,
                path: `courses/${course.slug}/images/${lesson.id}`
            }).then(response => ({ ...data, imageUrl: response.url })) :
            Promise.resolve(data)
        ).then(data => {
            actions.updateLesson(course.id, lesson.id, data)
                .then(() => setLessonFormOpen(false));
        });
    }, [course, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (confirm('Удалить урок?')) {
            actions.deleteLesson(course.id, lesson.id)
                .then(() => history.push(unit.url));
        }
    }, [course, unit, lesson]);

    const handleCreateExercise = useCallback(data => {
        data.lessonId = lesson.id;

        actions.createExercise(course.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course]);

    const handleUpdateExercise = useCallback(data => {
        actions.updateExercise(course.id, exercise.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, activeExercise]);

    const handleDeleteExercise = useCallback(exercise => {
        if (confirm('Удалить упражнение?')) {
            actions.deleteExercise(course.id, exercise.id);
        }
    }, [course]);

    const handleAddExercise = useCallback(() => {
        setActiveExercise(undefined);
        setExerciseFormOpen(true);
    }, []);

    const handleEditExercise = useCallback(exercise => {
        setActiveExercise(exercise);
        setExerciseFormOpen(true);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);

    return (
        <Page id="lesson-page">
            <PageHeader
                title={
                    <>
                        <Link to={course.url}>{course.title}</Link>
                        <Link to={unit.url}>{unit.title}</Link>
                        {lesson.title}
                    </>
                }
                actions={[
                    {
                        key: 'add',
                        icon: 'add',
                        title: 'Создать упражнение',
                        onClick: handleAddExercise
                    },
                    {
                        key: 'edit',
                        icon: 'edit',
                        title: 'Редактировать урок',
                        onClick: () => setLessonFormOpen(true)
                    },
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: handleDeleteLesson
                    }
                ]}
            />

            <PageContent>
                <LessonDetails
                    lesson={lesson}
                    onEditExercise={handleEditExercise}
                    onDeleteExercise={handleDeleteExercise}
                />
            </PageContent>

            <FormDialog
                title="Редактирование урока"
                form="lesson-form"
                open={isLessonFormOpen}
                onClose={() => setLessonFormOpen(false)}
            >
                <LessonForm
                    lesson={lesson}
                    onSubmit={handleUpdateLesson}
                />
            </FormDialog>

            <FormDialog
                title={activeExercise ? 'Редактирование упражнения' : 'Новое упражнение'}
                form="exercise-form"
                open={isExerciseFormOpen}
                onClose={() => setExerciseFormOpen(false)}
            >
                <ExerciseForm
                    exercise={activeExercise}
                    course={course}
                    onSubmit={activeExercise ? handleUpdateExercise : handleCreateExercise}
                />
            </FormDialog>
        </Page>
    );
}