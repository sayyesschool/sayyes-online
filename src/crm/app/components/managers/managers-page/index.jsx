import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import { useStore } from 'app/store';
import ManagersTable from 'app/components/managers/managers-table';
import ManagerForm from 'app/components/managers/manager-form';

export default function ManagersPage({ history }) {
    const [managers, actions] = useStore('managers.list');
    const [manager, setManager] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getManagers();
    }, []);

    const createManager = useCallback(data => {
        return actions.createManager(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const deleteManager = useCallback(() => {
        return actions.deleteManager(manager.id)
            .then(() => {
                setManager(null);
                toggleConfirmationDialogOpen(false);
            });
    }, [manager]);

    const handleEdit = useCallback(manager => {
        history.push(manager.url, { edit: true });
    }, []);

    const handleDelete = useCallback(manager => {
        setManager(manager);
        toggleConfirmationDialogOpen(true);
    }, []);

    if (!managers) return <LoadingIndicator />;

    return (
        <Page className="ManagersPage">
            <Page.Header
                title="Менеджеры"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    title: 'Создать',
                    onClick: toggleFormOpen
                }]}
            />

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <ManagersTable
                        managers={managers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                form="manager-form"
                title="Новый менеджер"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <ManagerForm
                    id="manager-form"
                    onSubmit={createManager}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={`Вы действительно хотите удалить менеджера ${manager?.fullname}?`}
                open={isConfirmationDialogOpen}
                onConfirm={deleteManager}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}