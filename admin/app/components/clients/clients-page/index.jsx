import React, { useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import ClientTable from 'app/components/clients/client-table';
import ClientForm from 'app/components/clients/client-form';

export default function ClientsPage({ history }) {
    const [clients, actions] = useStore('clients.list');

    const [isClientFormOpen, toggleClientFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getClients();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createClient(data)
            .then(() => toggleClientFormOpen(false));
    }, []);

    const handleEdit = useCallback(client => {
        history.push(client.url, { edit: true });
    }, []);

    const handleDelete = useCallback(client => {
        history.push(client.url, { delete: true });
    }, []);

    return (
        <Page id="clients" loading={!clients}>
            <PageHeader
                title="Клиенты"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        outlined: true,
                        onClick: toggleClientFormOpen
                    }
                ]}
            />

            <PageContent>
                <ClientTable
                    clients={clients}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageContent>

            <FormPanel
                title="Новый клиент"
                open={isClientFormOpen}
                form="client-form"
                onClose={toggleClientFormOpen}
            >
                <ClientForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}