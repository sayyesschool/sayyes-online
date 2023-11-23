import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import LessonForm from 'app/components/lessons/lesson-form';
import LessonsTable from 'app/components/lessons/lessons-table';

export default function Lessons() {
    const [lessons, actions] = useStore('lessons.list');

    const [lesson, setLesson] = useState();
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getLessons();
    }, []);

    const handleCreateLesson = useCallback(data => {
        return actions.createLesson(data)
            .then(() => toggleFormDialogOpen(false));
    }, []);

    const handleUpdateLesson = useCallback(data => {
        if (!lesson) return;

        return actions.updateLesson(lesson.id, data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (!lesson) return;

        return actions.deleteLesson(lesson.id)
            .finally(() => {
                setLesson();
                toggleConfirmationDialogOpen(false);
            });
    }, [lesson]);

    const handleCreateLessonRequest = useCallback(() => {
        setLesson();
        toggleFormDialogOpen(true);
    }, []);

    const handleUpdateLessonRequest = useCallback(lesson => {
        setLesson(lesson);
        toggleFormDialogOpen(true);
    }, []);

    const handleDeleteLessonRequest = useCallback(lesson => {
        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, []);

    if (!lessons) return <LoadingIndicator />;

    return (
        <Page className="LessonsPage">
            <Page.Header
                title="Уроки"
                actions={[{
                    key: 'add',
                    title: 'Создать',
                    icon: 'add',
                    onClick: handleCreateLessonRequest
                }]}
            />

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <LessonsTable
                        lessons={lessons}
                        onEdit={handleUpdateLessonRequest}
                        onDelete={handleDeleteLessonRequest}
                    />
                </Page.Section>
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