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
            centered
            fixed
            primaryAction={<Button onClick={onActionClick}>Оплатить</Button>}
        />
    );
}