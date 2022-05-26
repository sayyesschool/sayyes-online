import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/icon';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/hooks/store';
import PaymentForm from 'app/components/payments/payment-form';
import PaymentsTable from 'app/components/payments/payments-table';

export default function Payments({ match, history }) {
    const [{ list: payments, single: payment }, actions] = useStore('payments');

    const [isPaymentFormOpen, togglePaymentFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getPayments();

        if (match.params.id) {
            actions.getPayment(match.params.id)
                .then(() => togglePaymentFormOpen(true));
        }
    }, []);

    const handleSubmit = useCallback(data => {
        return actions.updatePayment(data)
            .then(() => togglePaymentFormOpen(false));
    }, []);

    const handleEdit = useCallback(payment => {
        actions.setPayment(payment);
        togglePaymentFormOpen(true);
    }, []);

    const handleDelete = useCallback(payment => {
        if (confirm('Подтвердите удаление платежа')) {
            return actions.deletePayment(payment.id);
        }
    }, []);

    const handleOpen = useCallback(() => {
        actions.unsetPayment();
        togglePaymentFormOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        actions.unsetPayment();
        togglePaymentFormOpen(false);
        history.push('/payments');
    }, []);

    return (
        <Page id="payments" loading={!payments}>
            <PageHeader
                title="Платежи"
                actions={[
                    {
                        key: 'add',
                        icon: 'add',
                        iconOnly: true,
                        text: true,
                        title: 'Новый платеж',
                        onClick: togglePaymentFormOpen
                    }
                ]}
            />

            <PageContent>
                <PageSection>
                    <PaymentsTable
                        payments={payments}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </PageSection>
            </PageContent>

            <FormDialog
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