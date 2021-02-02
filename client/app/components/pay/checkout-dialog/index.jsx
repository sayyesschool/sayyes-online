import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function CheckoutDialog({ open, children, onClose }) {
    return (
        <Dialog
            className="checkout-dialog"
            title="Оплата обучения"
            open={open}
            onClose={onClose}
        >
            <Dialog.Content>
                {children}
            </Dialog.Content>

            <Dialog.Actions>
                <Button
                    type="button"
                    label="Отменить"
                    onClick={onClose}
                />

                <Button
                    type="submit"
                    form="payment-form"
                    label="Оплатить"
                    unelevated
                />
            </Dialog.Actions>
        </Dialog>
    );
}