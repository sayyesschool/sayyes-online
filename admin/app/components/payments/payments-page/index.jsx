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

        if (match.params.id) {
            actions.getPayment(match.params.id)
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

    const handleOpen = useCallback(() => {
        actions.unsetPayment();
        setPaymentFormOpen(true);
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
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        outlined: true,
                        onClick: handleOpen
                    }
                ]}
            />

            <PageContent>
                {payments?.length > 0 ?
                    <PaymentList
                        payments={payments}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    :
                    <EmptyState title="Платежей нет" />
                }
            </PageContent>

            <FormPanel
                title={payment ? 'Редактирование платежа' : 'Новый платеж'}
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