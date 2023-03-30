import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import ClientsTable from 'app/components/clients/clients-table';
import ClientForm from 'app/components/clients/client-form';
import ClientsSearchForm from 'app/components/clients/clients-search-form';

export default function ClientsPage({ history }) {
    const [clients, actions] = useStore('clients.list');
    const [client, setClient] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getClients();
    }, []);

    const createClient = useCallback(data => {
        return actions.createClient(data)
            .finally(() => toggleFormOpen(false));
    }, []);

    const deleteClient = useCallback(() => {
        return actions.deleteClient(client.id)
            .finally(() => {
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
        <Page className="sy-ClientsPage">
            <Page.Header
                title="Клиенты"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    title: 'Создать',
                    onClick: toggleFormOpen
                }]}
            />

            <Page.Content>
                <ClientsSearchForm />

                <Page.Section variant="outlined" compact>
                    <ClientsTable
                        clients={clients}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

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