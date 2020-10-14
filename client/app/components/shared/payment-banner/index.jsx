import React from 'react';
import {
    Banner,
    Button,
    Icon
} from 'mdc-react';

export default function PaymentBanner({ onActionClick }) {
    return (
        <Banner
            className="payment-banner"
            icon={<Icon>warning</Icon>}
            text="Пора платить!"
            actions={<Button onClick={onActionClick}>Оплатить</Button>}
        />
    );
}