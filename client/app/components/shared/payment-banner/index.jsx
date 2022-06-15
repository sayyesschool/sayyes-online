import { Alert, Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

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