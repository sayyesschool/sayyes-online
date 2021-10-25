import { useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog, DialogTitle, DialogContent, DialogActions,
    FormField,
    Typography
} from 'mdc-react';

import './index.scss';

export default function TicketDialog({ onClose, ...props }) {
    const [isConfirmed, setConfirmed] = useState(true);

    function handleSubmit() {
        if (typeof ym === 'function') {
            ym(YANDEX_METRIKA_ID, 'reachGoal', 'purchase');
        }

        if (typeof gtag === 'function') {
            gtag('event', 'click', { event_category: 'purchase' });
        }

        return true;
    }

    return (
        <Dialog
            id="ticket-dialog"
            onClose={onClose}
            {...props}
        >
            <DialogTitle>Покупка билета</DialogTitle>

            <DialogContent>
                <form id="ticket-form" method="post" action="/api/tickets" onSubmit={handleSubmit}>
                    <Typography noMargin>Для записи на встречу необходимо приобрести билет. Билет позволит посетить 1 разговорный клуб в любое время.</Typography>

                    <FormField label="Я согласен/на с условиями предоставления услуг и политикой конфиденциальности.">
                        <Checkbox
                            name="confirm"
                            checked={isConfirmed}
                            required
                            onChange={() => setConfirmed(!isConfirmed)}
                        />
                    </FormField>
                </form>
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>

                <Typography variant="headline5" noMargin>350 руб.</Typography>
                <Button unelevated type="submit" form="ticket-form">Приобрести</Button>
            </DialogActions>
        </Dialog>
    );
}