import Stepper from 'shared/components/stepper';
import { statusOptions } from 'shared/data/enrollment';
import { IconButton, Menu } from 'shared/ui-components';

import './EnrollmentStatus.scss';

export default function EnrollmentStatus({ enrollment, onUpdate }) {
    const { status } = enrollment;

    return (
        <section className="EnrollmentStatus">
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

            <Menu
                trigger={
                    <IconButton
                        icon="more_vert"
                        size="sm"
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