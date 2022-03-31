import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ClientForm from 'app/components/clients/client-form';
import ClientDetails from 'app/components/clients/client-details';
import ClientContacts from 'app/components/clients/client-contacts';
import ClientEnrollments from 'app/components/clients/client-enrollments';
import ClientPayments from 'app/components/clients/client-payments';
import ClientRequests from 'app/components/clients/client-requests';

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
        return clientActions.updateClient(client.id, data)
            .then(() => toggleClientFormOpen(false));
    }, [client]);

    const deleteClient = useCallback(() => {
        return clientActions.deleteClient(client.id)
            .then(() => history.push('/clients'));
    }, [client]);

    if (!client) return <LoadingIndicator />;

    return (
        <Page id="client">
            <PageHeader
                breadcrumbs={[
                    { text: 'Клиенты', url: '/clients' }
                ]}
                title={client?.fullname}
                actions={[
                    (client.hhid && {
                        element: 'a',
                        href: `https://sayes.t8s.ru/Profile/${client.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    {
                        key: 'edit',
                        title: 'Редактировать',
                        icon: 'edit',
                        onClick: toggleClientFormOpen
                    },
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
                    <ClientDetails
                        client={client}
                    />

                    <ClientContacts
                        client={client}
                        onUpdate={updateClient}
                    />

                    <ClientRequests
                        requests={client?.requests}
                    />

                    <ClientEnrollments
                        client={client}
                    />

                    <ClientPayments
                        client={client}
                    />
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
        </Page >
    );
}