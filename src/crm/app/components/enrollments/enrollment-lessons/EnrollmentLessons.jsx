import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import http from 'shared/services/http';
import { Alert, IconButton, Menu, Text } from 'shared/ui-components';

import LessonForm from 'crm/components/lessons/lesson-form';
import LessonsForm from 'crm/components/lessons/lessons-form';
import { useActions } from 'crm/store';

export default function EnrollmentLessons({ enrollment }) {
    const actions = useActions('lessons');

    const [lesson, setLesson] = useState();
    const [lessonsToRefund, setLessonsToRefund] = useState();

    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isLessonsFormOpen, toggleLessonsFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isRefundDialogOpen, toggleRefundDialog] = useBoolean(false);

    const createLessons = useCallback(lessons => {
        lessons.forEach(lesson => {
            lesson.enrollmentId = enrollment.id;
            lesson.learnerId = enrollment.learnerId;
            lesson.teacherId = enrollment.teacherId;
        });

        return actions.createLessons(lessons)
            .then(() => toggleLessonsFormOpen(false));
    }, [enrollment, actions, toggleLessonsFormOpen]);

    const createLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        return actions.createLesson(data)
            .then(() => toggleNewLessonFormOpen(false));
    }, [enrollment, actions, toggleNewLessonFormOpen]);

    const updateLesson = useCallback(data => {
        return actions.updateLesson(lesson.id, data)
            .then(() => toggleEditLessonFormOpen(false));
    }, [lesson, actions, toggleEditLessonFormOpen]);

    const deleteLesson = useCallback(() => {
        return actions.deleteLesson(lesson.id)
            .then(() => toggleConfirmationDialogOpen(false));
    }, [lesson, actions, toggleConfirmationDialogOpen]);

    const handleEdit = useCallback(lesson => {
        setLesson(lesson);
        toggleEditLessonFormOpen(true);
    }, [toggleEditLessonFormOpen]);

    const handleDelete = useCallback(lesson => {
        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, [toggleConfirmationDialogOpen]);

    const handleRefund = useCallback(() => {
        return http.post(`/admin/api/enrollments/${enrollment.id}/refund`, {
            lessonIds: lessonsToRefund.map(l => l.id)
        }).finally(() => {
            toggleRefundDialog(false);
        });
    }, [enrollment, lessonsToRefund, toggleRefundDialog]);

    const handleRefundSingleLesson = useCallback(lesson => {
        return http.post(`/admin/api/enrollments/${enrollment.id}/refund`, {
            lessonIds: [lesson.id]
        }).finally(() => {
            toggleRefundDialog(false);
        });
    }, [enrollment, toggleRefundDialog]);

    const hasSchedule = enrollment.schedule?.length > 0;
    const availableLessons = enrollment.lessons.filter(lesson => lesson.status === 'scheduled');

    return (
        <PageSection
            className="EnrollmentLessons"
            title="Занятия"
            actions={
                <>
                    <Menu
                        trigger={
                            <IconButton
                                icon="add"
                                title="Создать"
                                size="sm"
                                disabled={!hasSchedule}
                            />
                        }
                        items={[
                            {
                                key: 'single',
                                content: 'Создать один урок',
                                onClick: toggleNewLessonFormOpen
                            },
                            {
                                key: 'multiple',
                                content: 'Создать несколько уроков',
                                onClick: toggleLessonsFormOpen
                            }
                        ]}
                    />

                    {/* {enrollment.schedule?.length > 1 &&
                        <IconButton
                            icon="add"
                            title="Вернуть денежные средства"
                            onClick={handleRefundRequest}
                        />
                    } */}
                </>
            }
        >
            {enrollment.status === 'active' &&
                enrollment.lessons.length > 0 &&
                enrollment.lessons.filter(l => l.status === 'scheduled').length === 0 &&
                    <Alert
                        content="Закончились уроки"
                        color="danger"
                    />
            }

            {enrollment.lessons?.length > 0 &&
                <LessonPillGroup
                    lessons={enrollment.lessons}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            }

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
                        learner: enrollment?.Learner,
                        teacher: enrollment?.teacher
                    }}
                    onSubmit={createLesson}
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
                    enrollment={enrollment}
                    onSubmit={createLessons}
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
                open={isRefundDialogOpen}
                title="Подтвердите возврат"
                onConfirm={handleRefund}
                onClose={toggleRefundDialog}
            >
                <Text as="p">Сумма возврата за уроки составляет <strong>{enrollment.lessonPrice * lessonsToRefund?.length} руб.</strong></Text>

                <LessonPillGroup
                    lessons={lessonsToRefund}
                />
            </ConfirmationDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить урок?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteLesson}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}