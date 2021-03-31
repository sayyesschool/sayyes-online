import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore, useActions } from 'app/hooks/store';
import ClientForm from 'app/components/clients/client-form';
import ClientDetails from 'app/components/clients/client-details';
import ClientEnrollments from 'app/components/clients/client-enrollments';
import ClientRequests from 'app/components/clients/client-requests';
import ClientPayments from 'app/components/clients/client-payments';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import PaymentForm from 'app/components/payments/payment-form';

import './index.scss';

export default function ClientPage({ match, location, history }) {
    const [client, clientActions] = useStore('clients.single');
    const enrollmentActions = useActions('enrollments');
    const paymentActions = useActions('payments');

    const [isClientFormOpen, setClientFormOpen] = useState(false);
    const [isEnrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        clientActions.getClient(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    setClientFormOpen(true);
                } else if (location.state?.delete) {
                    setConfirmationDialogOpen(true);
                }
            });
    }, []);

    const updateClient = useCallback(data => {
        clientActions.updateClient(client.id, data)
            .then(() => setClientFormOpen(false));
    }, [client]);

    const deleteClient = useCallback(() => {
        clientActions.deleteClient(client.id)
            .then(() => history.push('/clients'));
    }, [client]);

    const createEnrollment = useCallback(data => {
        enrollmentActions.createEnrollment(data)
            .then(({ data }) => history.push(`/clients/${client?.id}/enrollments/${data?.id}`));
    }, [client]);

    const createPayment = useCallback(data => {
        data.client = client.id;

        paymentActions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, [client]);

    if (!client) return <LoadingIndicator />;

    client.enrollments.map(enrollment => enrollment.url = `${client.url}${enrollment.url}`);

    return (
        <Page id="client">
            <PageTopBar
                title={client?.fullname}
                actions={[
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: () => setConfirmationDialogOpen(true)
                    }
                ]}
            />

            <PageContent>
                <Grid>
                    <Grid.Cell span="3">
                        <ClientDetails
                            client={client}
                            onEdit={() => setClientFormOpen(true)}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientRequests
                            requests={client?.requests}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientEnrollments
                            enrollments={client?.enrollments}
                            onCreate={() => setEnrollmentFormOpen(true)}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientPayments
                            payments={client?.payments}
                            onCreate={() => setPaymentFormOpen(true)}
                        />
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormDialog
                form="client-form"
                title="Данные клиента"
                open={isClientFormOpen}
                onClose={() => setClientFormOpen(!isClientFormOpen)}
            >
                <ClientForm
                    id="client-form"
                    client={client}
                    onSubmit={updateClient}
                />
            </FormDialog>

            <FormDialog
                form="enrollment-form"
                title="Новое обучение"
                open={isEnrollmentFormOpen}
                onClose={() => setEnrollmentFormOpen(false)}
            >
                <EnrollmentForm
                    id="enrollment-form"
                    enrollment={{
                        client
                    }}
                    onSubmit={createEnrollment}
                />
            </FormDialog>

            <FormDialog
                form="payment-form"
                title="Новый платеж"
                open={isPaymentFormOpen}
                onClose={() => setPaymentFormOpen(false)}
            >
                <PaymentForm
                    id="payment-form"
                    payment={{
                        client
                    }}
                    onSubmit={createPayment}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить клиента?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteClient}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}