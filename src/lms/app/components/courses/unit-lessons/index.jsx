import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import LessonForm from 'app/components/courses/lesson-form';
import LessonsList from 'app/components/courses/lessons-list';

export default function UnitLessons({ unit, onCreate, onDelete, onReorder }) {
    const [lesson, setLesson] = useState();
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        return onCreate(data).finally(() => toggleFormDialogOpen(false));
    }, [onCreate]);

    const handleDelete = useCallback(() => {
        return onDelete(lesson).finally(() => {
            toggleConfirmationDialogOpen(false);
            setLesson(undefined);
        });
    }, [lesson, onDelete]);

    const handleReorderLessons = useCallback((index, dir) => {
        const lessons = unit._lessons.slice();
        const lesson = lessons[index];
        const otherLesson = lessons[index + dir];

        lessons[index + dir] = lesson;
        lessons[index] = otherLesson;

        onReorder({ _lessons: lessons });
    }, [unit]);

    const handleDeleteRequest = useCallback(lesson => {
        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="sy-UnitLessons"
            title="Уроки"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Добавить урок',
                onClick: toggleFormDialogOpen
            }]}
            compact
        >
            <LessonsList
                lessons={unit.lessons}
                onReorder={handleReorderLessons}
                onDelete={handleDeleteRequest}
            />

            <FormDialog
                title="Новый урок"
                open={isFormDialogOpen}
                onClose={toggleFormDialogOpen}
            >
                <LessonForm
                    id="lesson-form"
                    onSubmit={handleCreate}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить урок?"
                message={unit && `Урок "${unit.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}