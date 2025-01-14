import PaymentIsland from './payment';

import './styles.scss';

const formats = window.data;

const paymentModal = new window.ui.Modal('#payment-modal');
const paymentIsland = new PaymentIsland('#payment-view');

document.querySelectorAll('.pay-btn').forEach(button => {
    button.addEventListener('click', () => {
        const format = formats.find(format => format.id === button.dataset.formatId);

        if (!format) return;

        paymentIsland.render({ format });

        paymentModal.open();
        paymentModal.on('closed', () => paymentIsland.destroy());
    });
});