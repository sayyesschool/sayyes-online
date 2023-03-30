import Stepper from 'shared/components/stepper';
import { IconButton, MenuButton } from 'shared/ui-components';
import { statusOptions } from 'shared/data/enrollment';

import './index.scss';

export default function EnrollmentStatus({ enrollment, onUpdate }) {
    const { status } = enrollment;

    return (
        <section className="sy-EnrollmentStatus">
            <Stepper>
                <Stepper.Step
                    icon="pending"
                    content="Обработка"
                    active={status === 'processing'}
                    completed={status === 'trial' || status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    icon="event_available"
                    content="Пробный урок"
                    active={status === 'trial'}
                    completed={status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    icon="payment"
                    content="Оплата"
                    active={status === 'payment'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    icon="school"
                    content="Обучение"
                    active={status === 'active'}
                />

                <Stepper.Divider />

                <Stepper.Step
                    icon="check_circle"
                    content="Завершено"
                    active={status === 'completed'}
                />
            </Stepper>

            <MenuButton
                trigger={
                    <IconButton
                        icon="more_vert"
                        color="neutral"
                        size="sm"
                        variant="plain"
                    />
                }
                items={statusOptions.map(status => ({
                    ...status,
                    activated: status.value === enrollment.status,
                    onClick: () => onUpdate({ status: status.value })
                }))}
            />
        </section>
    );
}