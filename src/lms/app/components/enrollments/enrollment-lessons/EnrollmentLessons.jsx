import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import PageSection from 'shared/components/page-section';

import { useActions } from 'app/store/hooks';
import LessonForm from 'app/components/lessons/lesson-form';

export default function EnrollmentLessons({ enrollment, readonly }) {
    const lessonActions = useActions('lessons');

    const [lesson, setLesson] = useState();
    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isRefundConfirmationDialogOpen, toggleRefundConfirmationDialogOpen] = useBoolean(false);
    const [isDeleteConfirmationDialogOpen, toggleDeleteConfirmationDialogOpen] = useBoolean(false);

    const createLesson = useCallback(data => {
        data.enrollmentId = enrollment.id;

        return lessonActions.createLesson(data)
            .then(() => toggleNewLessonFormOpen(false));
    }, [enrollment]);

    const updateLesson = useCallback(data => {
        return lessonActions.updateLesson(lesson.id, data)
            .then(() => toggleEditLessonFormOpen(false));
    }, [lesson]);

    const refundLesson = useCallback(() => {
        return lessonActions.deleteLesson(lesson.id)
            .then(() => toggleDeleteConfirmationDialogOpen(false));
    }, [lesson]);

    const deleteLesson = useCallback(() => {
        return lessonActions.deleteLesson(lesson.id)
            .then(() => toggleDeleteConfirmationDialogOpen(false));
    }, [lesson]);

    const handleEdit = useCallback(lesson => {
        setLesson(lesson);
        toggleEditLessonFormOpen(true);
    }, []);

    const handleRefund = useCallback(lesson => {
        setLesson(lesson);
        toggleRefundConfirmationDialogOpen(true);
    }, []);

    const handleDelete = useCallback(lesson => {
        setLesson(lesson);
        toggleDeleteConfirmationDialogOpen(true);
    }, []);

    const lessonsDuration = enrollment.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    const lessonsDurationDelta = enrollment.lessonDuration * enrollment.lessons.length - lessonsDuration;

    return (
        <PageSection
            className="EnrollmentLessons"
            title="Занятия"
            description={lessonsDurationDelta !== 0 && ((lessonsDurationDelta < 0 ? 'Превышение на' : 'Осталось') + ` ${Math.abs(lessonsDurationDelta)} мин.`)}
            actions={!readonly && [{
                key: 'add-lesson',
                icon: 'add',
                title: 'Создать урок',
                onClick: toggleNewLessonFormOpen
            }]}
        >
            {enrollment.lessons.length > 0 &&
                <LessonPillGroup
                    lessons={enrollment.lessons}
                    onEdit={handleEdit}
                    onRefund={handleRefund}
                    onDelete={handleDelete}
                    readonly={readonly}
                />
            }

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
                        learner: enrollment?.learner?.id,
                        teacher: enrollment?.teacher?.id
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
                message="Вы действительно хотите вернуть деньги за урок?"
                open={isRefundConfirmationDialogOpen}
                onConfirm={refundLesson}
                onClose={() => toggleRefundConfirmationDialogOpen(false)}
            />

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить урок?"
                open={isDeleteConfirmationDialogOpen}
                onConfirm={deleteLesson}
                onClose={() => toggleDeleteConfirmationDialogOpen(false)}
            />
        </PageSection>
    );
}