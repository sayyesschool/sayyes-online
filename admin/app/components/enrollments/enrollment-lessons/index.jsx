import { useCallback, useState } from 'react';
import { Alert, Button, MenuButton, Text } from '@fluentui/react-northstar';

import http from 'shared/services/http';
import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/ui-components/icon';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import PageSection from 'shared/components/page-section';

import { useActions } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';
import LessonsForm from 'app/components/lessons/lessons-form';
import LessonsPillGroup from 'shared/components/lessons-pill-group';

import './index.scss';

export default function EnrollmentLessons({ enrollment }) {
    const lessonActions = useActions('lessons');

    const [lesson, setLesson] = useState();
    const [lessonsToRefund, setLessonsToRefund] = useState();

    const [isMenuOpen, toggleMenuOpen] = useBoolean();
    const [isNewLessonFormOpen, toggleNewLessonFormOpen] = useBoolean(false);
    const [isEditLessonFormOpen, toggleEditLessonFormOpen] = useBoolean(false);
    const [isLessonsFormOpen, toggleLessonsFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isRefundDialogOpen, toggleRefundDialog] = useBoolean(false);

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

    const handleEdit = useCallback(lesson => {
        setLesson(lesson);
        toggleEditLessonFormOpen(true);
    }, []);

    const handleDelete = useCallback(lesson => {
        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleRefund = useCallback(() => {
        return http.post(`/admin/api/enrollments/${enrollment.id}/refund`, {
            lessonIds: lessonsToRefund.map(l => l.id)
        }).finally(() => {
            toggleRefundDialog(false);
        });
    }, [enrollment, lessonsToRefund]);

    const handleRefundSingleLesson = useCallback(lesson => {
        return http.post(`/admin/api/enrollments/${enrollment.id}/refund`, {
            lessonIds: [lesson.id]
        }).finally(() => {
            toggleRefundDialog(false);
        });
    }, [enrollment]);

    const handleRefundRequest = useCallback(() => {
        return http.get(`/admin/api/enrollments/${enrollment.id}/refund`)
            .then(({ data }) => {
                setLessonsToRefund(data);
            })
            .finally(() => {
                toggleRefundDialog(true);
            });
    }, [enrollment]);

    const availableLessons = enrollment.lessons.filter(lesson => lesson.status === 'scheduled');

    return (
        <PageSection
            className="enrollment-lessons"
            title="Занятия"
            actions={
                <>
                    <MenuButton
                        open={isMenuOpen}
                        onOpenChange={toggleMenuOpen}
                        trigger={<Button icon={<Icon>add</Icon>} text iconOnly title="Создать" />}
                        menu={[
                            {
                                key: 'single',
                                content: 'Создать один урок',
                                disabled: enrollment.schedule?.length === 0,
                                onClick: toggleNewLessonFormOpen
                            },
                            {
                                key: 'multiple',
                                content: 'Создать несколько уроков',
                                disabled: enrollment.schedule?.length === 0,
                                onClick: toggleLessonsFormOpen
                            }
                        ]}
                    />

                    {enrollment.schedule?.length > 1 &&
                        <Button
                            title="Вернуть денежные средства"
                            icon={<Icon>add</Icon>}
                            text
                            iconOnly
                            onClick={handleRefundRequest}
                        />
                    }
                </>
            }
        >
            {enrollment.status === 'active' && enrollment.lessons.filter(l => l.status === 'scheduled').length === 0 &&
                <Alert header="Закончились уроки" danger />
            }

            {enrollment.lessons.length > 0 &&
                <LessonPillGroup
                    lessons={enrollment.lessons}
                    onEdit={handleEdit}
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
                open={isRefundDialogOpen}
                title="Подтвердите возврат"
                onConfirm={handleRefund}
                onClose={toggleRefundDialog}
            >
                <Text as="p">Сумма возврата за уроки составляет <strong>{enrollment.lessonPrice * lessonsToRefund?.length} руб.</strong></Text>

                <LessonsPillGroup
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