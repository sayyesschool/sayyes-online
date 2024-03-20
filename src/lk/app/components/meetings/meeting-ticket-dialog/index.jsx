import { useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog, DialogTitle, DialogContent, DialogActions,
    FormField,
    Typography
} from 'mdc-react';

import { YANDEX_METRIKA_ID } from 'shared/constants';

import './index.scss';

export default function TicketDialog({ onClose, ...props }) {
    const [isConfirmed, setConfirmed] = useState(true);

    function handleSubmit() {
        if (typeof ym === 'function') {
            window.ym(YANDEX_METRIKA_ID, 'reachGoal', 'purchase');
        }

        if (typeof gtag === 'function') {
            window.gtag('event', 'click', { event_category: 'purchase' });
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
                    <Typography>Для записи на встречу необходимо приобрести билет. Билет позволит посетить 1 разговорный клуб в любое время.</Typography>

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

                <Typography variant="headline5">350 руб.</Typography>
                <Button type="submit" form="ticket-form">Приобрести</Button>
            </DialogActions>
        </Dialog>
    );
}