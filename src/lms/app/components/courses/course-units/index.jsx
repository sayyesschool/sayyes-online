import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import UnitForm from 'app/components/courses/unit-form';
import UnitsList from 'app/components/courses/units-list';

export default function CourseUnits({ course, onCreate, onDelete }) {
    const [unit, setUnit] = useState();
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        return onCreate(data).finally(() => toggleFormDialogOpen(false));
    }, [onCreate]);

    const handleDelete = useCallback(() => {
        return onDelete(unit).finally(() => {
            toggleConfirmationDialogOpen(false);
            setUnit(undefined);
        });
    }, [unit, onDelete]);

    const handleDeleteRequest = useCallback(unit => {
        setUnit(unit);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="sy-CourseUnits"
            title="Юниты"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Добавить юнит',
                onClick: toggleFormDialogOpen
            }]}
            compact
        >
            <UnitsList
                units={course.units}
                onDelete={handleDeleteRequest}
            />

            <FormDialog
                title="Новый юнит"
                open={isFormDialogOpen}
                onClose={toggleFormDialogOpen}
            >
                <UnitForm
                    id="unit-form"
                    onSubmit={handleCreate}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить юнит?"
                message={unit && `Юнит "${unit.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}