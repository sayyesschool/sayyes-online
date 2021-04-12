import React, { useCallback, useState } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';

export default function EnrollmentLessons({ enrollment }) {
    const actions = useActions('lessons');

    const [lesson, setLesson] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreateLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        actions.createLesson(data)
            .then(() => toggleNewLessonFormOpen(false));
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
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleNewLessonFormOpen}
                        />
                    }
                />

                {enrollment.lessons.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.lessons.map(lesson =>
                                <List.Item
                                    key={lesson.id}
                                    graphic={<Icon>{lesson.statusIcon}</Icon>}
                                    primaryText={lesson.dateLabel}
                                    secondaryText={lesson.timeLabel}
                                    meta={
                                        <IconButton
                                            icon="remove"
                                            title="Удалить урок"
                                            onClick={event => handleDelete(event, lesson)}
                                        />
                                    }
                                    onClick={() => handleUpdate(lesson)}
                                />
                            )}
                        </List>
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