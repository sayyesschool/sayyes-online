import { useCallback, useState } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';

import UnitForm from 'app/components/courses/unit-form';
import UnitList from 'app/components/courses/unit-list';

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
            className="course-units"
            title="Юниты"
            actions={
                <Button
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={toggleFormDialogOpen}
                />
            }
        >
            <UnitList
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