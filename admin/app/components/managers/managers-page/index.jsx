import React, { useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import ManagersTable from 'app/components/managers/managers-table';
import ManagerForm from 'app/components/managers/manager-form';

export default function ManagersPage({ history }) {
    const [managers, actions] = useStore('managers.list');

    const [isManagerFormOpen, toggleManagerFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getManagers();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createClient(data)
            .then(() => toggleManagerFormOpen(false));
    }, []);

    const handleEdit = useCallback(manager => {
        history.push(manager.url, { edit: true });
    }, []);

    const handleDelete = useCallback(manager => {
        history.push(manager.url, { delete: true });
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

            <FormPanel
                form="manager-form"
                title="Новый менеджер"
                open={isManagerFormOpen}
                modal
                onClose={toggleManagerFormOpen}
            >
                <ManagerForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}