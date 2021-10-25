import { useCallback, useEffect, useState } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';
import EmptyState from 'shared/components/empty-state';

import { useStore } from 'app/hooks/store';
import PaymentsTable from 'app/components/payments/payments-table';
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
            <PageTopBar
                title="Платежи"
            />

            <PageContent>
                {payments?.length > 0 ?
                    <PaymentsTable
                        payments={payments}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    :
                    <EmptyState title="Платежей нет" />
                }
            </PageContent>

            <FormDialog
                form="payment-form"
                title={payment ? 'Редактирование платежа' : 'Новый платеж'}
                open={isPaymentFormOpen}
                onClose={handleClose}
            >
                <PaymentForm
                    payment={payment || undefined}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}