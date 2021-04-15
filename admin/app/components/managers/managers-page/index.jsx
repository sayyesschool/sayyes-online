import React, { useState, useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ManagersTable from 'app/components/managers/managers-table';
import ManagerForm from 'app/components/managers/manager-form';

export default function ManagersPage({ history }) {
    const [managers, actions] = useStore('managers.list');
    const [manager, setManager] = useState();

    const [isManagerFormOpen, toggleManagerFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getManagers();
    }, []);

    const createManager = useCallback(data => {
        actions.createManager(data)
            .then(() => toggleManagerFormOpen(false));
    }, []);

    const deleteManager = useCallback(() => {
        actions.deleteManager(manager.id)
            .then(() => {
                setClient(null);
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
        <Page id="managers-page">
            <PageTopBar
                title="Менеджеры"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        unelevated: true,
                        onClick: toggleManagerFormOpen
                    }
                ]}
            />

            <PageContent>
                <ManagersTable
                    managers={managers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageContent>

            <FormDialog
                form="manager-form"
                title="Новый менеджер"
                open={isManagerFormOpen}
                onClose={toggleManagerFormOpen}
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