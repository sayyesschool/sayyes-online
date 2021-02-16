import React, { useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ClientsTable from 'app/components/clients/clients-table';
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

    if (!clients) return <LoadingIndicator />;

    return (
        <Page id="clients-page">
            <PageTopBar
                title="Клиенты"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        unelevated: true,
                        onClick: toggleClientFormOpen
                    }
                ]}
            />

            <PageContent>
                <ClientsTable
                    clients={clients}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageContent>

            <FormDialog
                form="client-form"
                title="Новый клиент"
                open={isClientFormOpen}
                onClose={toggleClientFormOpen}
            >
                <ClientForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}