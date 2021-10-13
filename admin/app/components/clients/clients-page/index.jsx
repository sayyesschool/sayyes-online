import React, { useState, useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
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
    const [client, setClient] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getClients();
    }, []);

    const createClient = useCallback(data => {
        actions.createClient(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const deleteClient = useCallback(() => {
        actions.deleteClient(client.id)
            .then(() => {
                setClient(null);
                toggleConfirmationDialogOpen(false);
            });
    }, [client]);

    const handleEdit = useCallback(client => {
        history.push(client.url, { edit: true });
    }, []);

    const handleDelete = useCallback(client => {
        setClient(client);
        toggleConfirmationDialogOpen(true);
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
                        outlined: true,
                        onClick: toggleFormOpen
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
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <ClientForm
                    id="client-form"
                    onSubmit={createClient}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={`Вы действительно хотите удалить клиента ${client?.fullname}?`}
                open={isConfirmationDialogOpen}
                onConfirm={deleteClient}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}