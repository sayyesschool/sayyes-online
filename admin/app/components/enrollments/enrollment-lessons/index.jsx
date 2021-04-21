import React, { useCallback, useState } from 'react';
import {
    Card,
    ChipSet, Chip,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';
import LessonsForm from 'app/components/lessons/lessons-form';

import './index.scss';

export default function EnrollmentLessons({ enrollment }) {
    const actions = useActions('lessons');

    const [lesson, setLesson] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isLessonsFormOpen, toggleLessonsFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreateLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        actions.createLesson(data)
            .then(() => toggleNewLessonFormOpen(false));
    }, [enrollment]);

    const createLessons = useCallback(lessons => {
        lessons.forEach(lesson => {
            lesson.enrollment = enrollment.id;
            lesson.client = enrollment.client.id;
        });

        console.log(lessons);

        actions.createLesson(lessons)
            .then(() => toggleLessonsFormOpen(false));
    }, [enrollment]);

    const handleUpdateLesson = useCallback(data => {
        actions.updateLesson(lesson.id, data)
            .then(() => toggleEditLessonFormOpen(false));
    }, [lesson]);

    const handleDeleteLesson = useCallback(() => {
        actions.deleteLesson(lesson.id)
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
                                    text={lesson.shortDateLabel}
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
                    onSubmit={handleCreateLesson}
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
                    onSubmit={handleUpdateLesson}
                />
            </FormDialog>

            <FormDialog
                form="lessons-form"
                title="Новые занятия"
                open={isLessonsFormOpen}
                onClose={toggleLessonsFormOpen}
            >
                <LessonsForm
                    id="lessons-form"
                    onSubmit={createLessons}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить урок?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteLesson}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </section>
    );
}