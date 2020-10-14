import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import ClientList from 'app/components/clients/client-list';
import ClientForm from 'app/components/clients/client-form';

export default function ClientsPage({ history }) {
    const [isClientFormOpen, setClientFormOpen] = useState(false);
    const [clients, actions] = useStore('clients.list');

    useEffect(() => {
        actions.getClients();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createClient(data)
            .then(() => setClientFormOpen(false));
    }, []);

    const handleEdit = useCallback(client => {
        history.push(client.url, { edit: true });
    }, []);

    return (
        <Page id="clients" loading={!clients}>
            <PageHeader
                title="Клиенты"
                controls={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        onClick: () => setClientFormOpen(true)
                    }
                ]}
            />

            <PageContent>
                <ClientList
                    clients={clients}
                    onEdit={handleEdit}
                />
            </PageContent>

            <FormPanel
                title="Новый клиент"
                open={isClientFormOpen}
                form="client-form"
                onClose={() => setClientFormOpen(!isClientFormOpen)}
            >
                <ClientForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}