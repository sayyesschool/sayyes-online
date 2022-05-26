import { useCallback, useState } from 'react';
import { Button, Text } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/icon';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import PageSection from 'shared/components/page-section';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';
import LessonsForm from 'app/components/lessons/lessons-form';

import './index.scss';

export default function EnrollmentLessons({ enrollment }) {
    const lessonActions = useActions('lessons');

    const [lesson, setLesson] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isLessonsFormOpen, toggleLessonsFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createLessons = useCallback(lessons => {
        lessons.forEach(lesson => {
            lesson.enrollment = enrollment.id;
            lesson.client = enrollment.client?.id || enrollment.client;
            lesson.teacher = enrollment.teacher?.id || enrollment.teacher;
        });

        return lessonActions.createLessons(lessons)
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

    const lessonsDuration = enrollment.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    const lessonsDurationDelta = enrollment.lessonDuration * enrollment.lessons.length - lessonsDuration;

    return (
        <PageSection
            className="enrollment-lessons"
            title="Занятия"
            description={lessonsDurationDelta !== 0 && ((lessonsDurationDelta < 0 ? 'Превышение на' : 'Осталось') + ` ${Math.abs(lessonsDurationDelta)} мин.`)}
            actions={[
                <Button
                    key="add-lessons"
                    icon={<Icon>playlist_add</Icon>}
                    iconOnly
                    text
                    title="Создать несколько уроков"
                    disabled={enrollment.schedule?.length === 0}
                    onClick={toggleLessonsFormOpen}
                />,

                <Button
                    key="add-lesson"
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    title="Создать урок"
                    onClick={toggleNewLessonFormOpen}
                />
            ]}
        >
            {enrollment.lessons.length > 0 &&
                <LessonPillGroup
                    lessons={enrollment.lessons}
                    onClick={handleUpdate}
                    onDelete={handleDelete}
                />
            }

            <FormDialog
                form="lessons-form"
                title="Новые занятия"
                open={isLessonsFormOpen}
                onClose={toggleLessonsFormOpen}
            >
                <Text>{enrollment.scheduleLabel}</Text>

                <LessonsForm
                    id="lessons-form"
                    enrollment={enrollment}
                    onSubmit={createLessons}
                />
            </FormDialog>

            <FormDialog
                form="create-lesson-form"
                title="Новое занятие"
                open={isNewLessonFormOpen}
                onClose={toggleNewLessonFormOpen}
            >
                <LessonForm
                    id="create-lesson-form"
                    lesson={{
                        duration: enrollment.lessonDuration,
                        client: enrollment?.client,
                        teacher: enrollment?.teachers[0]
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
        </PageSection>
    );
}