import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/icon';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSection from 'shared/components/page-section';

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
        return actions.createManager(data)
            .then(() => toggleManagerFormOpen(false));
    }, []);

    const deleteManager = useCallback(() => {
        return actions.deleteManager(manager.id)
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
            <PageHeader
                title="Менеджеры"
                actions={[
                    {
                        key: 'add',
                        icon: <Icon>add</Icon>,
                        content: 'Создать',
                        onClick: toggleManagerFormOpen
                    }
                ]}
            />

            <PageContent>
                <PageSection>
                    <ManagersTable
                        managers={managers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </PageSection>
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