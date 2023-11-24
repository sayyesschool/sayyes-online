import { useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog, DialogTitle, DialogContent, DialogActions,
    FormField,
    Layout,
    Radio,
    Typography
} from 'mdc-react';

import { YANDEX_METRIKA_ID } from 'shared/constants';

import './index.scss';

export default function RegisterDialog({ meeting, onSubmit, onClose, ...props }) {
    const [isStudent, setIsStudent] = useState(false);
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
            id="register-dialog"
            onClose={onClose}
            {...props}
        >
            <DialogTitle>Регистрация на встречу</DialogTitle>

            <DialogContent>
                <Layout>
                    <Typography>Вы являетесь студентом SAY YES?</Typography>

                    <FormField label="Нет">
                        <Radio
                            name="student"
                            checked={!isStudent}
                            onChange={() => setIsStudent(false)}
                        />
                    </FormField>

                    <FormField label="Да">
                        <Radio
                            name="student"
                            checked={isStudent}
                            onChange={() => setIsStudent(true)}
                        />
                    </FormField>
                </Layout>

                {isStudent ?
                    <Typography>Вы можете принять участие бесплатно! После подтверждения вам на почту придет ссылка для входа.</Typography>
                    :
                    <form id="ticket-form" method="post" action="/api/tickets" onSubmit={handleSubmit}>
                        {meeting &&
                            <input type="hidden" name="meeting" defaultValue={meeting.id} />
                        }

                        <Typography>Для записи на встречу необходимо приобрести билет. Билет позволит посетить 1 встречу в любое время.</Typography>

                        <FormField label="Я согласен/на с условиями предоставления услуг и политикой конфиденциальности.">
                            <Checkbox
                                name="confirm"
                                checked={isConfirmed}
                                required
                                onChange={() => setConfirmed(!isConfirmed)}
                            />
                        </FormField>
                    </form>
                }
            </DialogContent>

            {isStudent ?
                <DialogActions>
                    <Button type="button" onClick={onClose}>Закрыть</Button>

                    <Button type="button" onClick={() => onSubmit(meeting, isStudent)}>Зарегистрироваться</Button>
                </DialogActions>
                :
                <DialogActions>
                    <Button type="button" onClick={onClose}>Закрыть</Button>

                    <Typography variant="headline5">350 руб.</Typography>
                    <Button type="submit" form="ticket-form">Приобрести</Button>
                </DialogActions>
            }
        </Dialog>
    );
}