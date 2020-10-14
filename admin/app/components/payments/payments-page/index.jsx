import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import EmptyState from 'app/components/shared/empty-state';
import PaymentList from 'app/components/payments/payment-list';
import PaymentForm from 'app/components/payments/payment-form';

export default function Payments({ match, history }) {
    const [{ list: payments, single: payment }, actions] = useStore('payments');
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);

    useEffect(() => {
        actions.getPayments();

        if (match.params.payment) {
            actions.getPayment(match.params.payment)
                .then(() => setPaymentFormOpen(true));
        }
    }, []);

    const handleSubmit = useCallback(data => {
        actions.updatePayment(data)
            .then(() => setPaymentFormOpen(false));
    }, []);

    const handleEdit = useCallback(payment => {
        actions.setPayment(payment);
        setPaymentFormOpen(true);
    }, []);

    const handleDelete = useCallback(payment => {
        if (confirm('Подтвердите удаление платежа')) {
            actions.deletePayment(payment.id);
        }
    }, []);

    const handleClose = useCallback(() => {
        actions.unsetPayment();
        setPaymentFormOpen(false);
        history.push('/payments');
    }, []);

    return (
        <Page id="payments" loading={!payments}>
            <PageHeader
                title="Платежи"
            />

            <PageContent>
                {payments?.length > 0 ?
                    <PaymentList
                        payments={payments}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    :
                    <EmptyState title="Платжей нет" />
                }
            </PageContent>

            <FormPanel
                title="Редактирование платежа"
                open={isPaymentFormOpen}
                form="payment-form"
                onClose={handleClose}
            >
                <PaymentForm
                    payment={payment || undefined}
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}