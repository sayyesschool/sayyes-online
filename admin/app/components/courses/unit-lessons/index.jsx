import { useCallback, useState } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Icon from 'shared/components/icon';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import LessonForm from 'app/components/courses/lesson-form';
import LessonList from 'app/components/courses/lesson-list';

export default function UnitLessons({ course, unit, onCreate, onDelete }) {
    const [lesson, setLesson] = useState();
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        return onCreate(data).finally(() => toggleFormDialogOpen(false));
    }, [onCreate]);

    const handleDelete = useCallback(() => {
        return onDelete(lesson).finally(() => {
            toggleConfirmationDialogOpen(false);
            setLesson(undefined);
        });
    }, [lesson, onDelete]);

    const handleDeleteRequest = useCallback(lesson => {
        setLesson(lesson);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="unit-lessons"
            title="Уроки"
            actions={
                <Button
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={toggleFormDialogOpen}
                />
            }
            compact
        >
            <LessonList
                lessons={unit.lessons}
                onDelete={handleDeleteRequest}
            />

            <FormDialog
                title="Новый урок"
                open={isFormDialogOpen}
                onClose={toggleFormDialogOpen}
            >
                <LessonForm
                    id="lesson-form"
                    onSubmit={handleSubmit}
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