import React, { useCallback, useState } from 'react';
import {
    Card,
    ChipSet, Chip,
    Icon,
    IconButton,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';
import LessonsForm from 'app/components/lessons/lessons-form';

import './index.scss';

export default function EnrollmentLessons({ enrollment }) {
    const lessonActions = useActions('lessons');
    const enrollmentActions = useActions('enrollments');

    const [lesson, setLesson] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isLessonsFormOpen, toggleLessonsFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createLessons = useCallback(data => {
        return enrollmentActions.createLessons(enrollment.id, data)
            .then(() => toggleLessonsFormOpen(false));
    }, [enrollment]);

    const createLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        return lessonActions.createLesson(data)
            .then(() => toggleNewLessonFormOpen(false));
    }, [enrollment]);

    const updateLesson = useCallback(data => {
        return lessonActions.updateLesson(lesson.id, data)
            .then(() => toggleEditLessonFormOpen(false));
    }, [lesson]);

    const deleteLesson = useCallback(() => {
        return lessonActions.deleteLesson(lesson.id)
            .then(() => toggleConfirmationDialogOpen(false));
    }, [lesson]);

    const handleUpdate = useCallback(lesson => {
        setLesson(lesson);
        toggleEditLessonFormOpen(true);
    }, []);

    const handleDelete = useCallback((event, lesson) => {
        event.stopPropagation();

        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    subtitle={enrollment.lessons.length === 0 && 'Занятий нет'}
                    actions={[
                        <IconButton
                            key="add-lessons"
                            icon="playlist_add"
                            title="Создать несколько уроков"
                            onClick={toggleLessonsFormOpen}
                        />,

                        <IconButton
                            key="add-lesson"
                            icon="add"
                            title="Создать урок"
                            onClick={toggleNewLessonFormOpen}
                        />
                    ]}
                />

                {enrollment.lessons.length > 0 &&
                    <Card.Section>
                        <ChipSet>
                            {enrollment.lessons.map(lesson =>
                                <Chip
                                    key={lesson.id}
                                    className={classnames('lesson-chip', `lesson-chip--${lesson.status}`)}
                                    text={<>
                                        <span className="lesson-date">{lesson.shortDateLabel}</span>
                                        <span className="lesson-time">{lesson.timeLabel}</span>
                                    </>}
                                    trailingIcon={<Icon onClick={event => handleDelete(event, lesson)}>delete</Icon>}
                                    onClick={() => handleUpdate(lesson)}
                                />
                            )}
                        </ChipSet>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                form="new-lesson-form"
                title="Новое занятие"
                open={isNewLessonFormOpen}
                onClose={toggleNewLessonFormOpen}
            >
                <LessonForm
                    id="new-lesson-form"
                    lesson={{
                        client: enrollment?.client,
                        teacher: enrollment?.teacher
                    }}
                    onSubmit={createLesson}
                />
            </FormDialog>

            <FormDialog
                form="edit-lesson-form"
                title="Редактирование занятия"
                open={isEditLessonFormOpen}
                onClose={toggleEditLessonFormOpen}
            >
                <LessonForm
                    id="edit-lesson-form"
                    lesson={lesson}
                    onSubmit={updateLesson}
                />
            </FormDialog>

            <FormDialog
                form="lessons-form"
                title="Новые занятия"
                open={isLessonsFormOpen}
                onClose={toggleLessonsFormOpen}
            >
                <Typography>{enrollment.scheduleLabel}</Typography>

                <LessonsForm
                    id="lessons-form"
                    onSubmit={createLessons}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить урок?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteLesson}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </section>
    );
}