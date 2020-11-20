import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import ConfirmationDialog from 'shared/components/confirmation-dialog';

import { useStore, useActions } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
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

    return (
        <Page id="client" loading={!client}>
            <PageHeader
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

                    <Grid.Cell span="3" grid>
                        <Grid.Cell span="12">
                            <ClientRequests
                                requests={client?.requests}
                            />
                        </Grid.Cell>

                        <Grid.Cell span="12">
                            <ClientPayments
                                payments={client?.payments}
                                onCreate={() => setPaymentFormOpen(true)}
                            />
                        </Grid.Cell>
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ClientEnrollments
                            client={client}
                            onCreate={() => setEnrollmentFormOpen(true)}
                        />
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormPanel
                title="Данные клиента"
                open={isClientFormOpen}
                form="client-form"
                onClose={() => setClientFormOpen(!isClientFormOpen)}
            >
                <ClientForm
                    client={client}
                    onSubmit={updateClient}
                />
            </FormPanel>

            <FormPanel
                title="Новое обучение"
                form="enrollment-form"
                open={isEnrollmentFormOpen}
                onClose={() => setEnrollmentFormOpen(false)}
            >
                <EnrollmentForm
                    enrollment={{
                        client
                    }}
                    onSubmit={createEnrollment}
                />
            </FormPanel>

            <FormPanel
                title="Новый платеж"
                form="payment-form"
                open={isPaymentFormOpen}
                onClose={() => setPaymentFormOpen(false)}
            >
                <PaymentForm
                    payment={{
                        client
                    }}
                    onSubmit={createPayment}
                />
            </FormPanel>

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