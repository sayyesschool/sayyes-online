import { useCallback, useState } from 'react';

import Calendar from 'shared/components/calendar';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useBoolean } from 'shared/hooks/state';
import { Button, Dialog, Grid } from 'shared/ui-components';

import EnrollmentsList from 'lk/components/enrollments/enrollments-list';
import LessonDetails from 'lk/components/lessons/lesson-details';
import LessonForm from 'lk/components/lessons/lesson-form';

export default function HomePage() {
    const [lessons, actions] = useLessons();
    const [enrollments] = useEnrollments();

    const [lesson, setLesson] = useState();
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleEventClick = useCallback(event => {
        setLesson(event.ref);
        toggleDialogOpen(true);
    }, []);

    const handleUpdateRequest = useCallback(() => {
        toggleDialogOpen(false);
        toggleFormDialogOpen(true);
    }, []);

    const handleDeleteRequest = useCallback(() => {
        toggleDialogOpen(false);
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleCreateLesson = useCallback(data => {
        return actions.createLesson(data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [actions]);

    const handleUpdateLesson = useCallback(data => {
        if (!lesson) return;

        return actions.updateLesson(lesson.id, data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [actions, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (!lesson) return;

        return actions.deleteLesson(lesson.id)
            .finally(() => {
                setLesson();
                toggleConfirmationDialogOpen(false);
            });
    }, [actions, lesson]);

    if (!lessons) return <LoadingIndicator fullscreen />;

    const events = lessons.map(lesson => {
        const date = new Date(lesson.date);
        const endDate = new Date(lesson.endAt);

        const startTime = {
            hours: date.getHours(),
            minutes: date.getMinutes()
        };
        const endTime = {
            hours: endDate.getHours(),
            minutes: endDate.getMinutes()
        };

        return {
            id: lesson.id,
            ref: lesson,
            title: 'Урок',
            date,
            startTime,
            endTime,
            duration: lesson.duration,
            status: lesson.status,
            icon: lesson.statusIcon
        };
    });

    return (
        <Page className="HomePage">
            <Page.Header
                title="Главная"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Запланировать урок',
                    onClick: toggleFormDialogOpen
                }]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item lg={3}>
                        <Page.Section title="Активные студенты" compact>
                            <EnrollmentsList
                                enrollments={enrollments}
                            />
                        </Page.Section>
                    </Grid.Item>

                    <Grid.Item lg={9}>
                        <Page.Section compact>
                            <Calendar
                                view="week-time"
                                events={events}
                                onEventClick={handleEventClick}
                            />
                        </Page.Section>
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                title={lesson ? 'Редактирование урока' : 'Новый урок'}
                open={isFormDialogOpen}
                onClose={toggleFormDialogOpen}
            >
                <LessonForm
                    id="lesson-form"
                    lesson={lesson}
                    onSubmit={lesson ? handleUpdateLesson : handleCreateLesson}
                />
            </FormDialog>

            <Dialog
                title="Детали урока"
                open={isDialogOpen}
                actions={[
                    <Button
                        icon="edit"
                        content="Изменить"
                        variant="soft"
                        color="neutral"
                        onClick={handleUpdateRequest}
                    />,
                    <Button
                        icon="delete"
                        content="Удалить"
                        variant="soft"
                        color="danger"
                        onClick={handleDeleteRequest}
                    />
                ]}
                onClose={toggleDialogOpen}
            >
                <LessonDetails
                    lesson={lesson}
                />
            </Dialog>

            <ConfirmationDialog
                title="Удалить урок?"
                message="Урок будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteLesson}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}