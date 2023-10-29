import { Alert, Button, Icon } from 'shared/ui-components';

export default function PaymentAlert({ onActionClick }) {
    return (
        <Alert
            className="payment-alert"
            start={<Icon>warning</Icon>}
            content="Пора платить!"
            end={
                <Button onClick={onActionClick}>Оплатить</Button>
            }
        />
    );
}