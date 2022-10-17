import { Alert, Button, Icon } from 'shared/ui-components';

export default function PaymentAlert({ onActionClick }) {
    return (
        <Alert
            className="payment-alert"
            icon={<Icon>warning</Icon>}
            content="Пора платить!"
            actions={[
                <Button onClick={onActionClick}>Оплатить</Button>
            ]}
        />
    );
}