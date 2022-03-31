import { useCallback, useState } from 'react';
import {
    Button,
    Flex
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { useLessons } from 'shared/hooks/lessons';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Dialog from 'shared/components/dialog';
import Icon from 'shared/components/material-icon';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Calendar from 'shared/components/calendar';

import LessonDetails from 'app/components/lessons/lesson-details';
import LessonForm from 'app/components/lessons/lesson-form';

import './index.scss';

export default function HomePage() {
    const [lessons, actions] = useLessons();

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
        actions.createLesson(data)
            .finally(() => toggleFormDialogOpen(false));
    }, [actions]);

    const handleUpdateLesson = useCallback(data => {
        if (!lesson) return;

        actions.updateLesson(lesson.id, data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [actions, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (!lesson) return;

        actions.deleteLesson(lesson.id)
            .finally(() => {
                setLesson();
                toggleConfirmationDialogOpen(false);
            });
    }, [actions, lesson]);

    if (!lessons) return <LoadingIndicator />;

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
        <Page id="home-page">
            <PageHeader
                title="Главная"
                actions={[
                    {
                        key: 'add-lesson',
                        kind: 'custom',
                        content: (
                            <Button
                                icon={<Icon>add</Icon>}
                                content="Запланировать урок"
                                primary
                                onClick={toggleFormDialogOpen}
                            />
                        )
                    }
                ]}
            />

            <PageContent>
                <Calendar
                    view="week-time"
                    events={events}
                    onEventClick={handleEventClick}
                />
            </PageContent>

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
                footer={
                    <Flex gap="gap.smaller">
                        <Button
                            icon={<Icon>edit</Icon>}
                            content="Изменить"
                            onClick={handleUpdateRequest}
                        />

                        <Button
                            icon={<Icon>delete</Icon>}
                            content="Удалить"
                            onClick={handleDeleteRequest}
                        />
                    </Flex>
                }
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