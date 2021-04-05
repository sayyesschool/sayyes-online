import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ClientForm from 'app/components/clients/client-form';
import ClientDetails from 'app/components/clients/client-details';
import ClientEnrollments from 'app/components/clients/client-enrollments';
import ClientRequests from 'app/components/clients/client-requests';
import ClientPayments from 'app/components/clients/client-payments';

import './index.scss';

export default function ClientPage({ match, location, history }) {
    const [client, clientActions] = useStore('clients.single');

    const [isClientFormOpen, toggleClientFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        clientActions.getClient(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    toggleClientFormOpen(true);
                } else if (location.state?.delete) {
                    toggleConfirmationDialogOpen(true);
                }
            });
    }, []);

    const updateClient = useCallback(data => {
        clientActions.updateClient(client.id, data)
            .then(() => toggleClientFormOpen(false));
    }, [client]);

    const deleteClient = useCallback(() => {
        clientActions.deleteClient(client.id)
            .then(() => history.push('/clients'));
    }, [client]);

    if (!client) return <LoadingIndicator />;

    return (
        <Page id="client">
            <PageTopBar
                breadcrumbs={[
                    <Link to="/clients">Клиенты</Link>
                ]}
                title={client?.fullname}
                actions={[
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                <Grid>
                    <Grid.Cell span="3">
                        <ClientDetails
                            client={client}
                            onEdit={toggleClientFormOpen}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientRequests
                            requests={client?.requests}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientEnrollments
                            client={client}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientPayments
                            client={client}
                        />
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormDialog
                form="client-form"
                title="Данные клиента"
                open={isClientFormOpen}
                onClose={toggleClientFormOpen}
            >
                <ClientForm
                    id="client-form"
                    client={client}
                    onSubmit={updateClient}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить клиента?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteClient}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}