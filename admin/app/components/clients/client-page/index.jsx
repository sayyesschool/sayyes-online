import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import ClientForm from 'app/components/clients/client-form';
import ClientDetails from 'app/components/clients/client-details';
import ClientEnrollments from 'app/components/clients/client-enrollments';
import ClientRequests from 'app/components/clients/client-requests';
import ClientPayments from 'app/components/clients/client-payments';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import PaymentForm from 'app/components/payments/payment-form';

import './index.scss';

export default function ClientPage({ match, location }) {
    const [client, actions] = useStore('clients.single');
    const [isClientFormOpen, setClientFormOpen] = useState(false);
    const [isEnrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getClient(match.params.id)
            .then(() => location.state?.edit && setClientFormOpen(true));
    }, []);

    const handleSubmit = useCallback(data => {
        actions.updateClient(data.id, data)
            .then(() => setClientFormOpen(false));
    }, []);

    const handleEnrollmentSubmit = useCallback(data => {
        actions.createEnrollment(data)
            .then(() => setEnrollmentFormOpen(false));
    }, []);

    const handlePaymentSubmit = useCallback(data => {
        data.client = client.id;

        paymentActions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, []);

    const handleDeleteClient = useCallback(() => {
        actions.deleteClient(client.id)
            .then(() => {
                history.push('/clients');
                setConfirmationDialogOpen(false);
            });
    }, []);

    return (
        <Page id="client" loading={!client}>
            <PageHeader
                title={client?.fullname}
                controls={[
                    {
                        key: 'edit',
                        title: 'Редактировать',
                        icon: 'edit',
                        onClick: () => setClientFormOpen(true)
                    },
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
                    onSubmit={handleSubmit}
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
                    onSubmit={handleEnrollmentSubmit}
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
                    onSubmit={handlePaymentSubmit}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить клиента?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteClient}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}