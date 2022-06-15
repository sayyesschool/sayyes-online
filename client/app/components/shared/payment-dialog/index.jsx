import { Dialog } from '@fluentui/react-northstar';

import './index.scss';

export default function PaymentDialog({ title = 'Оплата обучения', ...props }) {
    return (
        <Dialog
            className="payment-dialog"
            title={title}
            {...props}
        />
    );
}