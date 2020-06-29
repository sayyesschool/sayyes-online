import React, { useState, useEffect, useCallback } from 'react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import FormPanel from 'app/components/shared/form-panel';
import PaymentList from 'app/components/payments/payment-list';
import PaymentForm from 'app/components/payments/payment-form';

export default function Payments() {
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
    const [{ list: payments }, actions] = useStore('payments');

    useEffect(() => {
        actions.getPayments();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, []);

    return (
        <Page id="payments">
            <PageHeader
                title="Платежи"
                controls={[
                    {
                        key: 'add',
                        text: 'Создать',
                        iconProps: { iconName: 'Add' },
                        onClick: () => setPaymentFormOpen(true)
                    }
                ]}
            />

            <PageContent loading={!payments}>
                <PaymentList
                    payments={payments}
                />
            </PageContent>

            <FormPanel
                title="Создание платежа"
                isOpen={isPaymentFormOpen}
                form="payment-form"
                onDismiss={() => setPaymentFormOpen(false)}
            >
                <PaymentForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}