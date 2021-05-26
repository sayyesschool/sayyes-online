import React, { useCallback, useState } from 'react';
import {
    Card,
    IconButton,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LessonChipSet from 'shared/components/lesson-chip-set';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';

import './index.scss';

export default function EnrollmentLessons({ enrollment }) {
    const lessonActions = useActions('lessons');

    const [lesson, setLesson] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

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

    const lessonsDuration = enrollment.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    const lessonsDurationDelta = enrollment.lessonDuration * enrollment.lessons.length - lessonsDuration;

    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    subtitle={lessonsDurationDelta !== 0 && ((lessonsDurationDelta < 0 ? 'Превышение на' : 'Осталось') + ` ${Math.abs(lessonsDurationDelta)} мин.`)}
                    actions={[
                        <IconButton
                            key="add-lesson"
                            icon="add"
                            title="Создать урок"
                            onClick={toggleNewLessonFormOpen}
                        />
                    ]}
                />

                {enrollment.lessons.length > 0 &&
                    <Card.Section secondary>
                        <LessonChipSet
                            lessons={enrollment.lessons}
                            onClick={handleUpdate}
                            onDelete={handleDelete}
                        />
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
                        duration: enrollment.lessonDuration,
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